var chai = require('chai');
var assert = chai.assert;
var expect = chai.expect;
var chaiHttp = require('chai-http');
var service = require('../services/server-service');
var should = chai.should();
chai.use(chaiHttp);

describe('Test-service ==>> ', function() {
  describe('/GET stockindexlist ==>>', function() {
    it('should return 200 and array of data', function(done) {
      chai.request(service)
        .get('/stockindexlist')
        .end(function(res){
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.be.eql(0);
        });
        done();
    });
  });
});