import axios from "axios";
import { db } from "./db.js";

export async function updateSteamItemPrice(market_hash_name) {
  const url =
    "https://steamcommunity.com/market/priceoverview";

  const res = await axios.get(url, {
    params: {
      appid: 730,
      currency: 3, // EUR
      market_hash_name
    }
  });

  if (!res.data || !res.data.success) return null;

  const priceText = res.data.lowest_price || res.data.median_price;
  if (!priceText) return null;

  const price = parseFloat(
    priceText.replace(",", ".").replace(/[^\d.]/g, "")
  );

  db.prepare(`
    INSERT INTO steam_items (market_hash_name, last_price, currency, last_updated)
    VALUES (?, ?, 'EUR', ?)
    ON CONFLICT(market_hash_name)
    DO UPDATE SET
      last_price = excluded.last_price,
      last_updated = excluded.last_updated
  `).run(market_hash_name, price, Date.now());

  return price;
}
