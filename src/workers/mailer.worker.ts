import { Worker, Job } from "bullmq";
import { serverConfig } from "../config/index.ts";
import { RedisConnection } from "../config/redis.config.ts";
import { logger } from "../config/logger.config.ts";

const setupEmailWorker = () => {
	const emailWorker = new Worker(
		serverConfig.BULLMQ_MAILER_QUEUE_NAME,
		async (job: Job) => {
			// call the ext. email service
			logger.info(`Processing the email for: ${JSON.stringify(job.data)}`);
		},
		{
			connection: RedisConnection.getConn(),
		},
	);

	emailWorker.on("completed", (job: Job) => {
		logger.info(`Successfully sent the email: ${JSON.stringify(job.data)}`);
	});

	emailWorker.on(
		"failed",
		(job: Job | undefined, error: Error, prev: string) => {
			logger.error(`Failed to send the email: ${error}`);
		},
	);
};

export { setupEmailWorker };
