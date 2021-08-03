const express = require("express");

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

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
app.use("/download", require("./routes/download"));
app.use("/cors", require("./routes/cors"));
app.use("/vk", require("./routes/vk"));
app.use("/message", require("./routes/message"));

const PORT = process.env.PORT ?? 5000;

app.listen(PORT, () => {
  console.log(`Server has been started at ${PORT}...`);

  app.set("NODE_ENV", process.env.NODE_ENV);
  app.set("PORT", PORT);
});
