var Nightmare = require('nightmare');

exports.scrapeStockIndexList = function (req, res, callback) {
    const nightmare = Nightmare({ show: false });
    nightmare
        .goto('http://nasdaq.com')
        .wait(function () {
            if (document.querySelector('#indexvolume a').innerText == 'NASDAQ Composite') {
                return true;
            } else {
                return false;
            }
        })
        .evaluate(function () {
            var numOfStock = 7;
            var outputResult = [];
            var timeStamp = (new Date()).getTime();
            for (var index=0; index<numOfStock; index++) {
                var displayFields = document.querySelector('#indexTableRow'+index).innerText.split('\t');
                outputResult.push({
                    indexId: 'index'+index,
                    indexName: displayFields[0],
                    indexValue: displayFields[1],
                    netChange: displayFields[2],
                    timeStamp: timeStamp
                });
            }
            
            return outputResult;
        })
        .end()
        .then(function (result) {
            res.send(result);
            callback({ status:'ok', data: result });
        })
        .catch(function (error) {
            res.status(404).send('Bad Request : '+error);
            callback({ status:'error', data: [] });
        });
};
