/**
 * 启动核心组件：数据库、订阅发布事件循环
 */

import { log } from "../dep.ts";

import { migrate as migrateV1 } from "../database/migrations/v1.ts";

const logger = new log.Logger();

export function bootstrap() {
  logger.info("Commiting database migration: v1");
  migrateV1();
}
