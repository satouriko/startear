import { Ajv, log, SQLite } from "../dep.ts";

import { migrate as migrateV1 } from "../database/migrations/v1.ts";

const logger = new log.Logger();

export function bootstrap() {
  logger.info("Bootstrapping server...");

  const ajv = new Ajv();
  migrateV1();

  logger.info("Server started");
}
