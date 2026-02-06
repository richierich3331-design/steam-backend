const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(cors());

app.get("/steam/nearest-item", (req, res) => {
  const balance = Number(req.query.balance);
  const game = req.query.game;

  if (!balance || !game) {
    return res.status(400).json({ error: "Missing params" });
  }
// TODO: replace mock with real Steam data
axios
  .get("https://steamcommunity.com/market/priceoverview/", {
    params: {
      appid: 730,
      currency: 1,
      market_hash_name: "AK-47 | Redline (Minimal Wear)"
    }
  })
  .then(response => {
    res.json({
      item_name: "AK-47 | Redline",
      price: response.data.lowest_price,
      wear: "Minimal Wear",
      image_url: "https://steamcommunity.com/market/image/730/AK-47",
      market_url: "https://steamcommunity.com/market/listings/730/AK-47%20%7C%20Redline%20%28Minimal%20Wear%29"
    });
  })
  .catch(() => {
    res.status(500).json({ error: "Steam fetch failed" });
  });

});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server running on", PORT);
});

