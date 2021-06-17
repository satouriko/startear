export interface Plugin {
  bootstrap: () => void;
  __proto__: {
    name: string;
  };
}
