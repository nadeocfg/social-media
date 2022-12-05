import dotenv from "dotenv";
import express from "express";
import http from "http";
import next from "next";
import path from "path";
import db from "./db.js";
import authRoutes from "./api/auth.js";
import signupRoutes from "./api/signup.js";
import uploadRoutes from "./api/upload.js";

dotenv.config({ path: "./config.env" });

const app = express();
const server = http.Server(app);
const dev = process.env.NODE_ENV !== "production";
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();

db();

app.use(express.json());
const PORT = process.env.PORT || 3000;

app.use("/api/auth", authRoutes);
app.use("/api/signup", signupRoutes);
app.use("/api/upload", uploadRoutes);

// Static folder
app.use("/static", express.static(path.join(path.resolve(), "server/assets")));

nextApp.prepare().then(() => {
  app.all("*", (req, res) => handle(req, res));

  server.listen(PORT, (err) => {
    if (err) throw err;
    console.log("Express server running");
  });
});
