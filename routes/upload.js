const express = require("express");
const router = express.Router();

const { Dropbox } = require("dropbox");
const axios = require("axios");

const { accessToken, botToken, chatId, scriptUrl } = require("../user-config");

router.get("/", (req, res) => {
  res.redirect(scriptUrl);
});

router.post("/", (req, res) => {
  
  const body = req.body;

  // validate keys
  const keys = ["filename", "encoding", "content"];
  const objectKeys = Object.keys(body);
  if (!keys.every(k => objectKeys.includes(k))) {
    return res.json({success: false, message: "invalid keys"});
  }

  const { filename, encoding, content } = body;

  const path = `/${filename}`;
  let contents;

  try {
    contents = Buffer.from(content, encoding);
  }
  catch (erorr) {
    // ? idk but this doesnt work
    return res.json({success: false, message: "invalid buffer"});
  }
  
  uploadFile(path, contents).then(url => {
    // send url to telegram
    sendText(url);

    res.status(201).json({url});
  }).catch(error => {
    console.log(error);
    res.status(400).json(error);
  });

});

function uploadFile(path, contents) {

  return new Promise((resolve, reject) => {

    const dropbox = new Dropbox({ accessToken });

    dropbox.filesUpload({ path, contents }).then(response => {
      // ! uploaded successfully, now create shared link
      //console.log(response);

      dropbox.sharingCreateSharedLinkWithSettings({ path }).then(response => {
        // ! url received
        //console.log(response);

        const url = response.result.url;
        resolve(url);

        }).catch(error => {
          reject(error);
        });
    }).catch(error => {
      reject(error);
    });
  });

}

function sendText(text) {
  const url = `https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${chatId}&text=${text}`;

  axios.get(url).then(response => {
    console.log(response.data);
  }).catch(error => {
    console.log(error);
  });
}

module.exports = router;
