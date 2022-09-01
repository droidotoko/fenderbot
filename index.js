import dotenv from "dotenv";
import scanLink from "./components/scanLink.js";
import createInvite from "./components/createInvite.js";
import help from "./components/help.js";
import cron from "node-cron";
dotenv.config(); //initialize dotenv

import clientConfig from "./config/clientConfig.js";
scanLink();
createInvite();
help();
clientConfig.on("ready", () => {
  console.log(`Logged in as ${clientConfig.user.tag}!`);
  cron.schedule("*/9 * * * *", () => {
    clientConfig.user.setActivity(">/help");
  });
});

//make sure this line is the last line
clientConfig.login(process.env.CLIENT_TOKEN); //login bot using token
