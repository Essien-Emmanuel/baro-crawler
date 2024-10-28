import { createServer } from "http";
import app from "./app.js";

const server = createServer(app);

server.listen(8082, () => {
  server.on("error", (err) => {
    if (err) {
      console.log("SERVER_CONNECT_ERR:: ", err);
    } else {
      console.log("App running at port", 8082);
    }
  });
});
