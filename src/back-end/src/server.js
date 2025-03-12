import http from "http";
import chalk from "chalk/index.js";
import connectToDataBase from "./database/mongodb.js";
import expressServer from "./rest.js";
import { PORT } from "./config/env.js";

const server = http.createServer(expressServer);

server.listen(PORT, async () => {
  console.log(
    "your server is ready at",
    chalk.blue(`http://localhost:${PORT}`)
  );
  await connectToDataBase();
});
