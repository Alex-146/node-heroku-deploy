
const config = {};

if (process.env.NODE_ENV === "production") {
  config.accessToken = process.env.DROPBOX_TOKEN;
  config.scriptUrl = process.env.SCRIPT_URL;
  config.botToken = process.env.TELEGRAM_TOKEN;
  config.chatId = process.env.CHAT_ID;
}
else {
  const { DROPBOX_TOKEN, TELEGRAM_TOKEN, CHAT_ID, SCRIPT_URL } = require("./user-config.json");
  config.accessToken = DROPBOX_TOKEN;
  config.scriptUrl = SCRIPT_URL;
  config.botToken = TELEGRAM_TOKEN;
  config.chatId = CHAT_ID;
}

module.exports = config;
