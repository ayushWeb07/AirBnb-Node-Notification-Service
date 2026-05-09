import { serverConfig } from "./index.ts";
import Redis from "ioredis";

class RedisConnection {
	private static conn: Redis | null = null;

	private constructor() {}

	public static getConn(): Redis {
		if (!RedisConnection.conn) {
			RedisConnection.conn = new Redis({
				port: serverConfig.REDIS_SERVER_PORT,
				host: serverConfig.REDIS_SERVER_HOST,
			});
		}

		return RedisConnection.conn;
	}
}

export { RedisConnection };
