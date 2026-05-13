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
			gmailTransporter.sendMail(mailOptions, function (error, info) {
				if (error) {
					console.log("Error:", error);
				} else {
					console.log("Email sent: ", info.response);
				}
			});

			// call the ext. email service
			logger.info(`Processing the email for: ${JSON.stringify(job.data)}`);
		},
		{
			connection: RedisConnection.getConnectionObject(),
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
