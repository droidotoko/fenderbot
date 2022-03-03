import clientConfig from "../config/clientConfig.js";
const createInvite = () => {
  clientConfig.on("messageCreate", async (msg) => {
    if (msg.content.startsWith(">/invite")) {
      const guild = await clientConfig.guilds.fetch("935509319376580609");
      const invite = await guild.channels.cache
        .filter((channel) => channel.type === "GUILD_TEXT")
        .first()
        .createInvite({
          maxAge: 300, // maximum time for the invite, in milliseconds
          maxUses: 1, // maximum times it can be used
        });
      //reply with invite link
      try {
        return await msg.reply(
          invite
            ? `Here's your invite to our server: ${invite}`
            : "There has been an error during the creation of the invite."
        );
      } catch (error) {
        try {
          return await msg.author.send(
            "The bot does not have permissions. Give it the Administrator permission"
          );
        } catch (error) {
          return clientConfig.user.setActivity(">/help");
        }
      }
    }
  });
};

export default createInvite;
