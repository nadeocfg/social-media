require("dotenv").config({ path: "./config.env" });

const express = require("express");
const app = express();
const server = require("http").Server(app);
const next = require("next");
const dev = process.env.NODE_ENV !== "production";
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();
const path = require("path");

const connectDb = require("./db");
connectDb();

app.use(express.json());
const PORT = process.env.PORT || 3000;

app.use("/api/auth", require("./api/auth"));
app.use("/api/signup", require("./api/signup"));

// Static folder
app.use("/static", express.static(path.join(__dirname, "assets")));

nextApp.prepare().then(() => {
  app.all("*", (req, res) => handle(req, res));

  server.listen(PORT, (err) => {
    if (err) throw err;
    console.log("Express server running");
  });
});
