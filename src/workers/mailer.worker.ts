import { Worker, Job } from "bullmq";
import { serverConfig } from "../config/index.ts";
import { RedisConnection } from "../config/redis.config.ts";
import { logger } from "../config/logger.config.ts";
import { renderTemplateContent } from "../templates/templates.handler.ts";
import { gmailTransporter } from "../config/nodemailer.config.ts";
import type { AddEmailDto } from "../dtos/mailer.dto.ts";

const setupEmailWorker = async () => {
	const emailWorker = new Worker(
		serverConfig.BULLMQ_MAILER_QUEUE_NAME,
		async (job: Job) => {
			logger.info(`Processing the email...`);

			const payload: AddEmailDto = job.data;

			// get the email content
			const emailContent = await renderTemplateContent(
				payload.templateId,
				payload.params,
			);

			// Configure the mail object
			const mailOptions = {
				from: serverConfig.MAIL_USER_ADDRESS,
				to: payload.toMailAddress,
				subject: payload.subject,
				text: emailContent,
			};

			// Send the email
			await gmailTransporter.sendMail(mailOptions);
		},
		{
			connection: RedisConnection.getConnectionObject(),
		},
	);

	emailWorker.on("completed", (job: Job) => {
		const payload: AddEmailDto = job.data;
		logger.info(
			`Successfully sent the email to ${payload.toMailAddress} with template id: ${payload.templateId}`,
		);
	});

	emailWorker.on(
		"failed",
		(job: Job | undefined, error: Error, prev: string) => {
			throw error;
		},
	);
};

export { setupEmailWorker };
