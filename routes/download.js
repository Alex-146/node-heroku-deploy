const express = require("express");
const router = express.Router();

const { downloadScript } = require("../providers/dropbox");

router.get("/", async (req, res) => {
  const result = await downloadScript();
  if (result.ok) {
    const { name, fileBinary } = result.data;
    res.attachment(name);
    res.send(fileBinary);
  }
  else {
    res.json(result);
  }
});

module.exports = router;
