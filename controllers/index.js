var express = require('express');
var server = express();
var scraper = require('../helpers/scraper');
var router = express.Router();

router.get('/scrapestockindex', scraper.scrapeStockIndexList);

module.exports = router;