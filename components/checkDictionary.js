import unshort from "url-unshort";
let uu = unshort();
import domainList from "../domainList.js";
import deleteMessage from "./functions/deleteMessage.js";
const checkDictionary = async (result, msg) => {
  const domainsList = await domainList();

  if (result) {
    result.map(async (ele) => {
      try {
        let urls = await uu.expand(ele);
        urls = urls ? new URL(urls).hostname.replace("www.", "") : "";
        ele = new URL(ele).hostname.replace("www.", "");
        domainsList.map(async (ele2) => {
          if (urls === ele2 || ele === ele2) {
            deleteMessage(msg);
          }
        });
      } catch (error) {
        console.log(error);
      }
    });
  }
};
export default checkDictionary;
