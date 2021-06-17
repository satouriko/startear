import { Ajv, log } from "./dep.ts";
import { bootstrap } from "./core/bootstrap.ts";
import { Plugin } from "./core/plugin.ts";

const logger = new log.Logger();

export class App {
  private plugins: Plugin[] = [];

  use(plugin: Plugin) {
    if (
      this.plugins.findIndex((p) => p.__proto__ === plugin.__proto__) === -1
    ) {
      this.plugins.push(plugin);
    }
  }

  run() {
    /**
     * 解析配置文件，校验
     */
    const ajv = new Ajv();

    /**
     * 启动核心组件
     */
    logger.info("Bootstrapping Core...");
    bootstrap();
    logger.info("Core started");

    /**
     * 启动插件
     */
    for (const plugin of this.plugins) {
      logger.info(`Bootstrapping ${plugin.__proto__.name}...`);
      plugin.bootstrap();
      logger.info(`${plugin.__proto__.name} started`);
    }
  }
}
