const express = require("express");

const app = express();

app.get("/", (req, res) => {
  const data = {
    datetime: new Date().toISOString(),
    node_env: app.get("NODE_ENV"),
    port: app.get("PORT")
  };
  res.json(data);
});

app.use(express.json());

app.use("/upload", require("./routes/upload"));

const PORT = process.env.PORT ?? 5000;

app.listen(PORT, () => {
  console.log(`Server has been started at ${PORT}...`);

  app.set("NODE_ENV", process.env.NODE_ENV);
  app.set("PORT", PORT);
});
