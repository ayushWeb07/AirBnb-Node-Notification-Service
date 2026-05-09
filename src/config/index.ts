import "dotenv/config";

interface ServerConfig {
  PORT: number;
  REDIS_SERVER_HOST: string;
  REDIS_SERVER_PORT: number;
}

const serverConfig: ServerConfig = {
  PORT: Number(process.env.PORT) ?? 3000,
  REDIS_SERVER_HOST: process.env.REDIS_SERVER_HOST || "localhost",
  REDIS_SERVER_PORT: Number(process.env.REDIS_SERVER_PORT) || 6379,
};

export { serverConfig };
