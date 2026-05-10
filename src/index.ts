import express from "express";
import { serverConfig } from "./config/index.ts";
import v1Router from "./routers/v1/index.router.ts";
import { errorHandler } from "./middlewares/error.middleware.ts";
import { attachCorrelationId } from "./middlewares/correlation.middleware.ts";
import { logger } from "./config/logger.config.ts";
import { setupEmailWorker } from "./workers/mailer.worker.ts";
import type { AddEmailDto } from "./dtos/mailer.dto.ts";
import { addEmailToQueue } from "./producers/mailer.producer.ts";
import { ExpressAdapter } from "@bull-board/express";
import { createBullBoard } from "@bull-board/api";
import { BullMQAdapter } from "@bull-board/api/bullMQAdapter";
import { mailerQueue } from "./queues/mailer.queue.ts";

// config app
const app = express();

// config bull mq dashboard
const serverAdapter = new ExpressAdapter();
serverAdapter.setBasePath("/admin/queues");

createBullBoard({
	queues: [new BullMQAdapter(mailerQueue)],
	serverAdapter: serverAdapter,
});

// setup global middlewares
app.use(express.json());
app.use(attachCorrelationId);

// setup version routes
app.use("/api/v1", v1Router);
app.use("/admin/queues", serverAdapter.getRouter());

// setup the error middleware
app.use(errorHandler);

// spin up the server
app.listen(serverConfig.PORT, async () => {
	logger.info(`Server listening on http://localhost:${serverConfig.PORT}`);
	setupEmailWorker();
	logger.info(`Successfully completed the mailer worker setup`);

	// add an email notification to the queue
	const email: AddEmailDto = {
		toMailAddress: "john@gmail.com",
		subject: "Thanks for purchase",
		templateId: "temp-101",
		params: {
			userName: "johnDoe",
			userId: "user-909",
		},
	};

	await addEmailToQueue(email);
});
