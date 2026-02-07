function extractMarketHashName(steamUrl) {
  const match = steamUrl.match(/\/730\/(.+)$/);
  if (!match) return null;
  return decodeURIComponent(match[1]);
}

module.exports = { extractMarketHashName };
