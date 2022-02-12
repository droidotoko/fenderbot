import dotenv from "dotenv";
dotenv.config();
import clientConfig from "../config/clientConfig.js";
import nvt from "node-virustotal";
import checkDictionary from "./checkDictionary.js";
import deleteMessage from "./functions/deleteMessage.js";
const defaultTimedInstance = nvt.makeAPI(1000);
defaultTimedInstance.setKey(process.env.VIRUSTOTAL_KEY);

const checkLink = () => {
  clientConfig.on("messageCreate", async (msg) => {
    let result = msg.content.match(
      /(http|ftp|https):\/\/([\w_-]+(?:(?:\.[\w_-]+)+))([\w.,@?^=%&:\/~+#-]*[\w@?^=%&\/~+#-])/g
    );
    checkDictionary(result, msg);
    if (result) {
      result.map((link) => {
        const hashed = nvt.sha256(link);
        defaultTimedInstance.urlLookup(hashed, function (err, res) {
          if (err) {
            clientConfig.user.setActivity(">/help");
            return;
          }
          const responseList =
            JSON.parse(res).data.attributes.last_analysis_results;

          Object.entries(responseList).forEach(async ([key, val]) => {
            // the name of the current key.
            if (
              val.result === "malicious" ||
              val.result === "suspicious" ||
              val.result === "malware" ||
              val.result === "phishing" ||
              val.result === "spam"
            ) {
              deleteMessage(msg);
            }
          });
          return;
        });
      });
    }
  });
};

export default checkLink;
