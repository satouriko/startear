import { J } from "./dep.ts";
import * as DataSourceConfig from "./datasources/config.ts";

const ConfigSchema = J.type({
  dataSource: DataSourceConfig.ConfigSchema,
});

export type Config = J.TypeOf<typeof ConfigSchema>;
export let config: Config;
export function setConfig(c: Config) {
  if (!config) config = c;
  else Object.assign(config, c);
  DataSourceConfig.setConfig(c.dataSource);
}
export const configSchema = J.print(ConfigSchema);
