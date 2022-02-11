import clientConfig from "../../config/clientConfig.js";

const deleteMessage = async (msg) => {
  try {
    if (msg) {
      await msg.delete();
    }
    return await msg.channel.send(
      `${msg.author} has posted a suspicious link.`
    );
  } catch (error) {
    return clientConfig.user.setActivity(">/help");
  }
};

export default deleteMessage;
