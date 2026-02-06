const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

app.get("/steam/nearest-item", (req, res) => {
  const balance = Number(req.query.balance);
  const game = req.query.game;

  if (!balance || !game) {
    return res.status(400).json({ error: "Missing params" });
  }
// TODO: replace mock with real Steam data
  res.json({
    item_name: "AK-47 | Redline",
    price: 34.72,
    wear: "Minimal Wear",
    image_url: "https://example.com/image.png",
    market_url: "https://steamcommunity.com/market/"
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server running");
});
