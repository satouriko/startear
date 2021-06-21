import { J } from "../dep.ts";
import * as CaiyunappConfig from "./caiyunapp/config.ts";

export const ConfigSchema = J.type({
  caiyunapp: CaiyunappConfig.ConfigSchema,
});

export type Config = J.TypeOf<typeof ConfigSchema>;
export let config: Config;
export function setConfig(c: Config) {
  if (!config) config = c;
  else Object.assign(config, c);
  CaiyunappConfig.setConfig(c.caiyunapp);
}
