const express = require("express");
const { viewRender } = require("../controllers/url.controller");
const router = express.Router();

router.get("/", viewRender);

module.exports = router;
