import { SQLite } from "../dep.ts";

const { DB } = SQLite;

const db = new DB("startear.db");

export { db };
