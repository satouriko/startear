import { Ajv, log } from "../dep.ts";
const logger = new log.Logger();

export function bootstrap() {
  logger.info("Bootstrapping server...");
  const ajv = new Ajv();
  logger.info("Server started");
}
