const express = require("express");
const router = express.Router();

const { sendTextToOwner } = require("../providers/telegram");
const { uploadFile } = require("../providers/dropbox");
const { scriptUrl } = require("../user-config");

router.get("/", (req, res) => {
  res.redirect(scriptUrl);
});

router.post("/", async (req, res) => {
  const body = req.body;

  // validate keys
  const keys = ["filename", "encoding", "content"];
  const objectKeys = Object.keys(body);
  if (!keys.every(k => objectKeys.includes(k))) {
    return res.json({
      ok: false,
      message: "invalid keys"
    });
  }

  try {
    const { filename, encoding, content } = body; 
    const contents = Buffer.from(content, encoding);
    const response = await uploadFile(`/${filename}`, contents);
    if (response.ok) {
      const url = response.data.url;
      sendTextToOwner(url);
      
      res.status(200).json({
        ok: true,
        data: { url }
      });
    }
  }
  catch {
    console.log(error);
    res.status(500).json({
      ok: false
    });
  }
});

module.exports = router;
