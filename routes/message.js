const express = require("express");
const router = express.Router();

router.use(express.urlencoded({extended: false}));
router.use(express.json());

router.post("/", async (req, res) => {
  try {
    await send(JSON.stringify(req.body));
    return res.json({message: "ok"});
  }
  catch(error) {
    return res.status(500).json({message: error.message});
  }
});

const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false,
  requireTLS: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD
  }
});

function send(text) {
  return transporter.sendMail({
    from: process.env.SMTP_USER,
    to: process.env.SMTP_NOTIFY_USER,
    subject: "Temp subject",
    text
  });
}

module.exports = router;
