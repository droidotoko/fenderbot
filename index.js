import dotenv from "dotenv";
import scanLink from "./components/scanLink.js";
import createInvite from "./components/createInvite.js";
import help from "./components/help.js";
import cron from "node-cron";
import http from "http";
dotenv.config(); //initialize dotenv

import clientConfig from "./config/clientConfig.js";
scanLink();
createInvite();
help();
clientConfig.on("ready", () => {
  console.log(`Logged in as ${clientConfig.user.tag}!`);
  cron.schedule("*/6 * * * *", () => {
    clientConfig.user.setActivity(">/help");
  });
});

const port = process.env.PORT || 3000;

const requestHandler = (request, response) => {
  response.end("Hello Node.js Server!");
};

const server = http.createServer(requestHandler);

server.listen(port, (err) => {
  if (err) {
    return console.log("something bad happened", err);
  }

  console.log(`server is listening on ${port}`);
});

//make sure this line is the last line
clientConfig.login(process.env.CLIENT_TOKEN); //login bot using token
