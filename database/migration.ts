import { db } from "./db.ts";

export function migrate() {
  db.query(
    "CREATE TABLE IF NOT EXISTS people (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT)",
  );

  const names = ["Peter Parker", "Clark Kent", "Bruce Wayne"];

  // Run a simple query
  for (const name of names) {
    db.query("INSERT INTO people (name) VALUES (?)", [name]);
  }

  // Print out data in table
  for (const [name] of db.query("SELECT name FROM people")) {
    console.log(name);
  }
}
