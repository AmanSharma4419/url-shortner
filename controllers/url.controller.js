const shortid = require("shortid");
const URL = require("../models/url");

const handleGenerateShortUrl = async (req, res) => {
  if (!req.body.url) {
    return res.status(400).json({ err: "url is requried" });
  }
  const shortId = shortid();
  const urlDataToBeInserted = {
    shortId: shortId,
    redirectUrl: req.body.url,
    visitHistory: [],
  };
  await URL.create(urlDataToBeInserted);
  return res.status(200).json({ id: shortId, msg: "short url created" });
};

const redirectionShortUrl = async (req, res) => {
  const shortId = req.params.id;
  const urlInfo = await URL.findOneAndUpdate(
    { shortId: shortId },
    { $push: { visitHistory: { timestamp: Date.now() } } }
  );
  if (urlInfo) {
    return res.status(200).redirect(urlInfo.redirectUrl);
  } else {
    return res.status(404).json({ err: "url not found" });
  }
};

const clickUrlInfo = async (req, res) => {
  const { id } = req.params;
  const urlResult = await URL.findOne({ shortId: id });
  if (urlResult) {
    return res.status(200).json({
      totalClicks: urlResult.visitHistory.length,
      analytics: urlResult.visitHistory,
    });
  } else {
    return res.status(404).json({ err: "url not found" });
  }
};

module.exports = { handleGenerateShortUrl, redirectionShortUrl, clickUrlInfo };
