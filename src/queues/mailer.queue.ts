import { Queue } from "bullmq";
import { RedisConnection } from "../config/redis.config.ts";

const mailerQueueName = "queue:mailer";

const mailerQueue = new Queue(mailerQueueName, {
	connection: RedisConnection.getConn(),
});

export { mailerQueueName, mailerQueue };
