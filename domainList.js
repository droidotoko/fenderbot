import axios from "axios";

const domainList = async () => {
  try {
    const res = await axios({
      headers: {
        "Content-Type": "application/json",
      },
      method: "get",
      url: "https://raw.githubusercontent.com/nikolaischunk/discord-phishing-links/main/domain-list.json",
    });
    return res.data.domains;
  } catch (error) {
    console.log(error);
  }
};

export default domainList;
