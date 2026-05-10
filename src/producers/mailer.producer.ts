import { mailerQueue } from "../queues/mailer.queue.ts";
import type { AddEmailDto } from "../dtos/mailer.dto.ts";
import { logger } from "../config/logger.config.ts";

const mailerPayloadName = "payload:mailer";

const addEmailToQueue = async (payload: AddEmailDto) => {
	try {
		await mailerQueue.add(mailerPayloadName, payload);
		logger.info(
			`Successfully added the email to queue: ${JSON.stringify(payload)}`,
		);
	} catch (error) {
		logger.error("Failed to add the email to queue", error);
	}
};

export { mailerPayloadName, addEmailToQueue };
