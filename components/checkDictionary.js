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
        urls = urls ? urls : "nothing";

        domainsList.map(async (ele2) => {
          if (
            (urls.includes(ele2) && msg.content.includes(ele) && ele2 !== "ord.gg") ||
            msg.content.includes(ele2) && ele2 !== "ord.gg"
          ) {
            console.log(ele2);
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
