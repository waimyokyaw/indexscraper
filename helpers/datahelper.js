const config = require('./config/app-config');
const mongoose = require('mongoose');
var stockIndexModel = require('../models/stockindex');

mongoose.connect(config.mongodbUri, function(err){
    if(err) throw err;
});
const StockIndex = mongoose.model("StockIndex", stockIndexModel.stockIndexSchema);

exports.populateDummyStockIndex = async () => {
    
    var timeStamp = (new Date()).getTime();
    var index1 = new StockIndex({
        netChange: '\n8.23 ▲ 0.15%\n',
        indexId: 'index0',
        indexName: 'NASDAQ',
        indexValue: "5682.45",
        timeStamp : timeStamp
    });
    var index2 = new StockIndex({
        netChange: '\n10.7 ▲ 0.21%\n',
        indexId: 'index1',
        indexName: 'NASDAQ-100 (NDX)',
        indexValue: "5196.58",
        timeStamp : timeStamp
    });
    var index3 = new StockIndex({
        netChange: '\n-9.99 ▼ 0.19%\n',
        indexId: 'index2',
        indexName: 'Pre-Market (NDX)',
        indexValue: "5175.89",
        timeStamp : timeStamp
    });
    var index4 = new StockIndex({
        netChange: '\n-1.16 ▼ 0.02%\n',
        indexId: 'index3',
        indexName: 'After Hours (NDX)',
        indexValue: "5195.42",
        timeStamp : timeStamp
    });
    var index5 = new StockIndex({
        netChange: '\n-35.95 ▼ 0.18%\n',
        indexId: 'index4',
        indexName: 'DJIA',
        indexValue: "20054.34",
        timeStamp : timeStamp
    });
    var index6 = new StockIndex({
        netChange: '\n1.59 ▲ 0.07%\n',
        indexId: 'index5',
        indexName: 'S&P 500',
        indexValue: "2294.67",
        timeStamp : timeStamp
    });
    var index7 = new StockIndex({
        netChange: '\n-2.32 ▼ 0.17%\n',
        indexId: 'index6',
        indexName: 'Russell 2000',
        indexValue: "1358.74",
        timeStamp : timeStamp
    }); 
    var dummyStockIndexDocuments = [ index1, index2, index3, index4, index5, index6, index7 ];
    
    var stockIndexesCreated = await StockIndex.create(dummyStockIndexDocuments);
    return stockIndexesCreated;    
};

exports.dropStockIndexCollection = async() => {
    var removedStockIndexes = await StockIndex.remove({});
    return removedStockIndexes;
};

exports.getStockIndexListAsync = async() => {
	var stockIndexes = await StockIndex.find({});
    return stockIndexes;
};

exports.saveStockIndexes = async(data) => {
    var stockIndexes = [];
   
    for (var i=0; i<data.length; i++) {
		var item = data[i];
    
        var stockIndex = new StockIndex({
            netChange: item.netChange,
            indexId: item.indexId,
            indexName: item.indexName,
            indexValue: item.indexValue,
            timeStamp : item.timeStamp
        });
        stockIndexes.push(stockIndex);
        
	}

    var stockIndexesCreated = await StockIndex.create(stockIndexes);
    return stockIndexesCreated; 
};

exports.updateStockIndexes = async(data) => {
    var updated = false;
	for (var index=0; index<data.length; index++) {
        var itemStockIndex = data[index];
        
        var updatedStockIndex = await StockIndex.findOneAndUpdate({indexId: itemStockIndex.indexId},{
        	indexId: itemStockIndex.indexId,
			netChange: itemStockIndex.netChange,
            indexName: itemStockIndex.indexName,
            indexValue: itemStockIndex.indexValue,
            timeStamp : itemStockIndex.timeStamp   
        });
        if(!updated){
            updated = true;
        }
    }
    return updated;
};

exports.getStockIndex = async(byIndexId) => {
    var foundStockIndex = await StockIndex.findOne({indexId: byIndexId});
    return foundStockIndex;
};