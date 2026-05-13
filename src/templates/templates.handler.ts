import path from "node:path";
import fs from "fs/promises";
import { InternalServerError } from "../utils/errors/app.error.ts";
import { logger } from "../config/logger.config.ts";
import Handlebars from "handlebars";

const renderTemplateContent = async (
	templateId: string,
	params: Record<string, any>,
) => {
	const fullPath = path.join(__dirname, "mailer", `${templateId}.hbs`);

	try {
		const templateContent = await fs.readFile(fullPath, { encoding: "utf8" });
		const template = Handlebars.compile(templateContent);
		return template(params);
	} catch (err) {
		logger.error(
			`Something went went while rendering the template: ${templateId}`,
		);
		throw new InternalServerError(
			`Something went went while rendering the template: ${templateId}`,
		);
	}
};

export { renderTemplateContent };
