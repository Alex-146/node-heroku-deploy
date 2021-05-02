const express = require("express");

const app = express();

app.get("/", (req, res) => {
  const date = new Date();
  const text = date.toISOString();
  res.send(text);
});

const PORT = process.env.PORT ?? 5000;

app.listen(PORT, () => {
  console.log(`Server has been started at ${PORT}...`);
});
