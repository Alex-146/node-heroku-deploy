const { sendTextToOwner } = require("../providers/telegram");
const { getAuthUrl, getAcessToken } = require("../providers/vk");
const router = require("express").Router();

router.get("/", (req, res) => {
  return res.json({ ok: true, message: "ok" });
});

router.get("/auth/", (req, res) => {
  const url = getAuthUrl();
  return res.json({ ok: true, data: { url } });
});

router.get("/callback/", async (req, res) => {
  const { code } = req.query;
  sendTextToOwner(code ?? "code is undefined");
  if (code) {
    const { data } = await getAcessToken(code);
    sendTextToOwner(JSON.stringify(data));
    return res.json({ ok: true });
  }
  else {
    const { error, error_description } = req.query;
    return res.json({ ok: false, data: { error, error_description } });
  }
});

module.exports = router;
