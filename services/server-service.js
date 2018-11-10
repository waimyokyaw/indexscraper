var config = require('../helpers/config/app-config');
var dataHelper = require('../helpers/datahelper');
var express = require('express');
var server = express();
var axios = require('axios');
var refreshTimeout = 5;
var schedule = require('node-schedule');
var taskSchedule = new schedule.RecurrenceRule();
taskSchedule.minute = 10;

async function scrapeStockIndexOnSchdeule () {
    console.log('Running schedule scraper at: ', new Date());
    dataHelper.getStockIndexListAsync().then(function(indexlistData){
        if (indexlistData && indexlistData.length === 0) {
            axios.get(config.serverUrl()+'/api/scrapestockindex')
                .then(function(response){
                    if (response.data.length > 0) {
                        dataHelper.saveStockIndexes(response.data);
                    }
            });
        } else {
            axios.get(config.serverUrl()+'/api/scrapestockindex')
                .then(function(response){
                    if (response.data.length > 0) {
                        dataHelper.updateStockIndexes(response.data);
                    }
            });
        }
    }).catch(function(error) {
        console.error(error.stack);
    });
}

schedule.scheduleJob(taskSchedule, scrapeStockIndexOnSchdeule);

server.get('/stockindexlist', function (req, res) {

    dataHelper.getStockIndexListAsync().then(function(stockIndexlistData){
        if (stockIndexlistData && stockIndexlistData.length === 0) {
            axios.get(config.serverUrl()+'/api/scrapestockindex')
                .then(function(response){
                    if (response.data.length > 0) {
                        dataHelper.saveStockIndexes(response.data).catch(function(err){  console.error(error.stack);  });
                        res.send({ status: 'new', data: response.data});
                    }
            });
        } else {
            var diffMs = (new Date()).getTime() - stockIndexlistData[0].timeStamp;
            var diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000); // minutes
            if (diffMins > refreshTimeout) {
                axios.get(config.serverUrl()+'/api/scrapestockindex')
                .then(function(response){
                    if (response.data.length > 0) {
                        dataHelper.updateStockIndexes(response.data).catch(function(err){  console.error(error.stack);  });
                        res.send({ status:'renew', data: response.data});
                    }
                });
            } else {			
                res.send({ status:'delay', data: stockIndexlistData});
            }
        }
    }).catch(function(error) {
        console.error(error.stack);
    });

});

module.exports = server;