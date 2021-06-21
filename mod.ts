import { Ajv, log } from "./dep.ts";
import { bootstrap } from "./core/bootstrap.ts";
import { Plugin, PluginConstructor } from "./interfaces/plugin.ts";
import * as GlobalConfig from "./config.ts";

const logger = new log.Logger();

export class App {
  // deno-lint-ignore no-explicit-any
  private plugins: Plugin<any>[] = [];

  use<T>(plugin: Plugin<T> | PluginConstructor<T>) {
    if (typeof plugin === "function") {
      plugin = new plugin();
    }
    if (
      this.plugins.findIndex((p) => p.constructor === plugin.constructor) === -1
    ) {
      this.plugins.push(plugin);
    }
  }

  run() {
    /**
     * 解析配置文件，校验
     */
    logger.info("Reading config file...");
    const config = JSON.parse(Deno.readTextFileSync("./startear.json"));
    const ajv = new Ajv();
    const schema = JSON.parse(JSON.stringify(GlobalConfig.configSchema));
    for (const plugin of this.plugins) {
      // deno-lint-ignore no-explicit-any
      const constructor = plugin.constructor as PluginConstructor<any>;
      const pluginConfigSchema = constructor.configSchema;
      schema.properties[constructor.configKey] = pluginConfigSchema;
    }
    const validate = ajv.compile(schema);
    const valid = validate(config);
    if (!valid) {
      logger.error(validate.errors);
      Deno.exit();
    }
    GlobalConfig.setConfig(config);
    logger.info("Config file validates!");

    /**
     * 启动核心组件
     */
    logger.info("Bootstrapping...");
    bootstrap();
    logger.info("Core started");

    /**
     * 启动插件
     */
    for (const plugin of this.plugins) {
      // deno-lint-ignore no-explicit-any
      const constructor = plugin.constructor as PluginConstructor<any>;
      logger.info(`Loading ${constructor.name}...`);
      const pluginConfig = config[constructor.configKey];
      plugin.bootstrap(pluginConfig);
      logger.info(`${constructor.name} started`);
    }
  }
}
