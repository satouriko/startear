/**
 * 启动核心组件：数据库、订阅发布事件循环
 */

import { log } from "../dep.ts";

import { migrate } from "../database/migration.ts";

const logger = new log.Logger();

export function bootstrap() {
  logger.info("Commiting database migration...");
  migrate();
}
