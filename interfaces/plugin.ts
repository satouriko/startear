import { Json } from "../dep.ts";

export interface Plugin<T> {
  bootstrap: (config: T) => void;
}

export interface PluginConstructor<T> {
  new (): Plugin<T>;
  name: string;
  configSchema: Json.Type;
  configKey: string;
}

export function staticImplements<T>() {
  return <U extends T>(constructor: U) => {
    constructor;
  };
}
