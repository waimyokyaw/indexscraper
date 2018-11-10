var chai = require('chai');
var assert = chai.assert;
var expect = chai.expect;
var scraper = require('../../helpers/scraper');

describe('test-scraper', function() {
  
  describe('helper.scraper scrapeStockIndexList', function() {
    it('should return ok if success', function() {
      var mockReq = {};
      var mockRes = function() {
        this.value = "";
        this.send = function(text) {
          this.value = text;
        }
      } 
      scraper.scrapeStockIndexList(mockReq, mockRes, function(response) {
        expect(response.status).to.equal('ok');
        expect(mockRes.value).to.equal('ok');
        expect(response.length).to.equal(6);
        expect(response[0].indexId).to.equal("stock0");
        expect(response[0].indexName).to.equal("NASDAQ");
      });
    });
  });

});
 