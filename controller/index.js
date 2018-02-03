var express = require('express');
var server = express();
var scraper = require('../helper/scraper');
var router = express.Router();

router.get('/scrapeindexlist', scraper.scrapeIndexList);

module.exports = router;