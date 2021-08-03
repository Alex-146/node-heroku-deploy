const axios = require("axios");

const client_id = process.env.VK_APP_ID;
const client_secret = process.env.VK_SECRET_KEY;
const redirect_uri = process.env.VK_REDIRECT_URI;

function getAuthUrl() {
  return `https://oauth.vk.com/authorize?client_id=${client_id}&display=page&redirect_uri=${redirect_uri}&scope=friends&response_type=code&v=5.52`;
}

function getAcessToken(code) {
  const url = `https://oauth.vk.com/access_token?client_id=${client_id}&client_secret=${client_secret}&redirect_uri=${redirect_uri}&code=${code}`;
  return axios.get(url);
}

module.exports = { getAuthUrl, getAcessToken }