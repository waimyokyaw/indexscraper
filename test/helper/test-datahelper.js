var chai = require('chai');
var expect = chai.expect;

var datahelper = require('../../helper/datahelper');

describe('Test datahelper module', function() {
	describe('datahelper => populateDummyStockIndex', function() {
		it('expect to return array and documents count to equal 7 and first index name to be NASDAQ', async function() {
			
			var resultStockIndexesCreated = await datahelper.populateDummyStockIndex();
			expect(resultStockIndexesCreated).to.be.an('array');
			expect(resultStockIndexesCreated.length).to.equal(7);
			expect(resultStockIndexesCreated[0].indexName).to.equal('NASDAQ');

		});
	});
	
	describe('datahelper => getStockIndexListAsync', function() {
		it('expect return index list to be an array and first indexName to equal NASDAQ', async function() {
			
			var resultStockIndexes = await datahelper.getStockIndexListAsync();
			expect(resultStockIndexes).to.be.an('array');
			expect(resultStockIndexes[0].indexName).to.equal('NASDAQ');
			
		});
	});
	
	describe('datahelper => dropStockIndexCollection', function() {
		it('expect return rows effect to be >0 and ok:1', async function() {
		
			var resultRemovedStockIndexes = await datahelper.dropStockIndexCollection();
			expect(resultRemovedStockIndexes.n).to.greaterThan(0);
			expect(resultRemovedStockIndexes.ok).to.equal(1);
			
		});
	});
	
	describe('datahelper => saveStockIndexes', function() {
		it('expect to return an document just saved', async function() {
			var timeStamp = (new Date()).getTime();
			var newStockIndexes = [{
				indexId: 'index0',
        		indexName: 'NASDAQ',
				indexValue: '1000',
				netChange:'\n8.23 ▲ 0.15%\n',
				timeStamp: timeStamp
			}];

			var resultStockIndexCreated = await datahelper.saveStockIndexes(newStockIndexes);
			expect(resultStockIndexCreated).to.be.an('array');
			expect(resultStockIndexCreated.length).to.equal(1);
			expect(resultStockIndexCreated[0].indexName).to.equal('NASDAQ');
			
		});
	});
	describe('datahelper => updateStockIndexes => getStockIndex => dropStockIndexCollection', function() {
		it('expect to return resultIndexesUpdated as true ', async function() {
			var timeStamp = (new Date()).getTime();

			var newStockIndexes = [{
				indexId: 'index0',
        		indexName: 'NASDAQ',
				indexValue: '3000',
				netChange:'\n9.23 ▲ 0.15%\n',
				timeStamp: timeStamp
			}];

			var resultStockIndexesUpdated = await datahelper.updateStockIndexes(newStockIndexes);
			expect(resultStockIndexesUpdated).to.equal(true);
			
		});
		it('expect indexValue of getStockIndex to equal 3000', async function(){
			var stockIndexCustomIndexId = {indexId: 'index0'};
			var resultStockIndex = await datahelper.getStockIndex(stockIndexCustomIndexId.indexId);
			expect(resultStockIndex.indexValue).to.equal('3000');
		});
		it('expect return rows effect to be >0 and ok:1', async function() {
		
			var resultRemovedIndexes = await datahelper.dropStockIndexCollection();
			expect(resultRemovedIndexes.n).to.greaterThan(0);
			expect(resultRemovedIndexes.ok).to.equal(1);
			
		});
	});
});