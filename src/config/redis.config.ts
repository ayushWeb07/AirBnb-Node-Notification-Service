import { serverConfig } from "./index.ts";
import Redis from "ioredis";

class RedisConnection {
    private static conn: Redis | null= null;

    private constructor() {
    }

    public static getConn(): Redis {
        if (!this.conn) {
            this.conn= new Redis({
                port: serverConfig.REDIS_SERVER_PORT,
                host: serverConfig.REDIS_SERVER_HOST,
            });
        }

        return this.conn
    }
}

export {RedisConnection}