import "dotenv/config";

interface ServerConfig {
	PORT: number;
	REDIS_SERVER_HOST: string;
	REDIS_SERVER_PORT: number;
	BULLMQ_MAILER_QUEUE_NAME: string;
	BULLMQ_MAILER_PAYLOAD_NAME: string;
	BULLMQ_MAILER_ADD_EMAIL_ATTEMPTS: number;
	BULLMQ_MAILER_ADD_EMAIL_DELAY: number;
	MAIL_USER_ADDRESS: string;
	MAIL_APP_PASSWORD: string;
}

const serverConfig: ServerConfig = {
	PORT: Number(process.env.PORT) || 3000,
	REDIS_SERVER_HOST: process.env.REDIS_SERVER_HOST || "localhost",
	REDIS_SERVER_PORT: Number(process.env.REDIS_SERVER_PORT) || 6379,
	BULLMQ_MAILER_QUEUE_NAME:
		process.env.BULLMQ_MAILER_QUEUE_NAME || "queue-mailer",
	BULLMQ_MAILER_PAYLOAD_NAME:
		process.env.BULLMQ_MAILER_PAYLOAD_NAME || "payload-mailer",
	BULLMQ_MAILER_ADD_EMAIL_ATTEMPTS:
		Number(process.env.BULLMQ_MAILER_ADD_EMAIL_ATTEMPTS) || 3,
	BULLMQ_MAILER_ADD_EMAIL_DELAY:
		Number(process.env.BULLMQ_MAILER_ADD_EMAIL_DELAY) || 1000,
	MAIL_USER_ADDRESS: process.env.MAIL_USER_ADDRESS || "",
	MAIL_APP_PASSWORD: process.env.MAIL_APP_PASSWORD || "",
};

export { serverConfig };
