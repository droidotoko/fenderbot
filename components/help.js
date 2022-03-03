import clientConfig from "../config/clientConfig.js";

const help = () => {
  clientConfig.on("messageCreate", async (msg) => {
    if (msg.author.bot) return false;
    if (
      msg.content.includes("@here") ||
      msg.content.includes("@everyone") ||
      msg.type == "REPLY"
    ) {
      return false;
    }
    if (
      msg.mentions.has(clientConfig.user.id) ||
      msg.content.startsWith(">/help")
    ) {
      try {
        await msg.channel.send({
          embeds: [
            {
              description: "**__Just add the bot and watch it in action.__**",
              title:
                "FenderBot detects viruses, malware and phishing links and deletes them. You have to provide Administrator privilages to it for the bot to work.",
              fields: [
                {
                  value: "Generates an invite link to the support server.",
                  name: "```>/invite```",
                },

                {
                  value: "https://www.virustotal.com/gui/home/upload",
                  name: "__**Courtesy: **VirusTotal API __",
                },
              ],
            },
          ],
        });
      } catch (error) {
        try {
          return await msg.author.send(
            "The bot does not have permissions. Give it the Administrator permission"
          );
        } catch (error) {
          return clientConfig.user.setActivity(">/help");
        }
      }
      //embed text for help
    }
  });
};

export default help;
