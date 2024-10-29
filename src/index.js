import { createServer } from "http";
import app from "./app.js";
import Config from "./config.js";
import Database from "./database/connection.js";

const PORT = Config.app.port;
const server = createServer(app);

Database.getInstance();

server
  .on("error", (err) => {
    if (err) {
      console.log("SERVER_CONNECT_ERR >>> ", err.message);
    }
  })
  .listen(PORT, () => {
    console.log("APP ENVIRONMENT::", PORT);
  });
