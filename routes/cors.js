const router = require("express").Router();

const cors = require("cors");
const axios = require("axios");

router.use(cors());

router.get("/", async (req, res) => {
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

router.post("/", async (req, res) => {
  const { url } = req.body;

  try {
    const {status, data} = await axios.get(url);
    return res.status(status).json(data);
  }
  catch(error) {
    return res.json({ok: false, url, message: error.message});
  }
});

router.post("/post", async (req, res) => {
  const { url, form } = req.body;

  if (!url || !form) {
    return res.status(400).json({message: "No <url> or <form> presented in request body"});
  }

  try {
    const {status, data} = await axios.post(url, form);
    return res.status(status).json(data);
  }
  catch(error) {
    return res.status(400).json({message: error.message});
  }
});

module.exports = router;