const express = require("express");
const cors = require("cors");
const axios = require("axios");
const { getSteamPrice } = require("./steamPriceCache.js");
const { extractMarketHashName } = require("./steamUrlUtils.js");


const app = express();
app.use(cors());
app.use(express.json());

/* EXISTING ROUTE — KEEP SEPARATE */
app.get("/steam/nearest-item", async (req, res) => {
  const balance = Number(req.query.balance);
  const game = req.query.game;

  if (!balance || !game) {
    return res.status(400).json({ error: "Missing params" });
  }

  // your existing nearest-item logic stays here
  res.json({ ok: true });
});

/* NEW ROUTE — STANDALONE */
app.get("/steam/price", async (req, res) => {
  const { market_hash_name } = req.query;

  if (!market_hash_name) {
    return res.status(400).json({ error: "missing market_hash_name" });
  }

  const data = await getSteamPrice(market_hash_name);

  if (!data) {
    return res.status(404).json({ error: "price not found" });
  }

  res.json(data);
});

/* SERVER START — ALWAYS LAST */
app.post("/steam/validate-item", (req, res) => {
  const { steam_url } = req.body;

  const market_hash_name = extractMarketHashName(steam_url);

  res.json({
    market_hash_name
  });
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server running");
});
