import "dotenv/config";

interface ServerConfig {
  PORT: number;
}

const serverConfig: ServerConfig = {
  PORT: Number(process.env.PORT) ?? 3000,
};

export { serverConfig };
