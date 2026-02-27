const express = require("express");
const cors = require("cors");
const pool = require("./db");

const app = express();

app.use(cors({ origin: "*" }));
app.use(express.json());

/* ================= HOME ================= */

app.get("/", (req, res) => {
  res.send("🦇 BATCOM Backend Online — Gotham Protected");
});

/* ================= HEALTH CHECK ================= */

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

/* ================= START SERVER ================= */

app.listen(8000, "0.0.0.0", () => {
  console.log("🦇 Gotham Server Running on port 8000");
});