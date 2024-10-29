import dotenv from "dotenv";

dotenv.config();

const config = {
  app: { port: +process.env.PORT },
  mail: {},
  db: { uri: process.env.DB_URI },
};

export default config;
