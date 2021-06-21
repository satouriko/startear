import { J } from "../../dep.ts";

export const ConfigSchema = J.type({
  api_key: J.string,
});

export type Config = J.TypeOf<typeof ConfigSchema>;
export let config: Config;
export function setConfig(c: Config) {
  if (!config) config = c;
  else Object.assign(config, c);
}
