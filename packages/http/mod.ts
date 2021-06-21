import { J } from "../../dep.ts";
import { staticImplements } from "../../interfaces/plugin.ts";
// deno-lint-ignore no-unused-vars
import type { PluginConstructor } from "../../interfaces/plugin.ts";

const ConfigSchema = J.type({
  port: J.number,
});

export type HttpConfig = J.TypeOf<typeof ConfigSchema>;
const configSchema = J.print(ConfigSchema);
const defaultConfig: HttpConfig = {
  port: 1997,
};

// deno-fmt-ignore
@staticImplements<PluginConstructor<HttpConfig>>()
export default class Http {
  public static configSchema = configSchema;
  public static configKey = "http";
  bootstrap(config: HttpConfig = defaultConfig) {
    console.log("http bootstrapped: " + config.port);
  }
}
