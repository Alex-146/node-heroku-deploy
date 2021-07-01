const axios = require("axios");
const { botToken, chatId } = require("../user-config");

async function sendTextToOwner(text) {
  const url = `https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${chatId}&text=${text}`;

  try {
    const response = await axios.get(url);
    const { data } = response;
    return data;
  }
  catch(error) {
    console.log(error);
    return { ok: false }
  }
}

module.exports = { sendTextToOwner }
