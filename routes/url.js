const express = require("express");
const {
  handleGenerateShortUrl,
  redirectionShortUrl,
  clickUrlInfo,
} = require("../controllers/url.controller");
const router = express.Router();

router.post("/url", handleGenerateShortUrl);
router.get("/:id", redirectionShortUrl);
router.get("/analytics/:id", clickUrlInfo);

module.exports = router;
