const router = require("express").Router();

const cors = require("cors");
const axios = require("axios");

router.get("/", cors(), async (req, res) => {
  const url = req.query.url;
  
  if (!url) {
    return res.json({ok: true, message: "It works!"});
  }

  try {
    const {data} = await axios.get(url);
    return res.json({ok: true, data});
  }
  catch(error) {
    return res.json({ok: false, message: error.message});
  }
});

router.post("/", cors(), async (req, res) => {
  const { url } = req.body;

  try {
    const {data} = await axios.get(url);
    return res.json({ok: true, url, data});
  }
  catch(error) {
    return res.json({ok: false, url, message: error.message});
  }
});

module.exports = router;