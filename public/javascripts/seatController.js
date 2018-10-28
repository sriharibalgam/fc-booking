var express = require('express');
var mysql = require('mysql');

var pool = mysql.createPool({
    host     : 'localhost',
    user     : 'root',
    password : 'root',
    database : 'fcbooking',
    port : '3306'
  });

var getAllSeats = function(slotId, fcId) {

    return new Promise((resolve) => {
        var allSeats;

        console.log(`GET allSeats for FC: ${fcId} and Slot: ${slotId}`);

        pool.getConnection(function(err, connection) {
            if(!err) {
                connection.query(`SELECT * FROM SEATS WHERE fcId=${fcId} AND slotId=${slotId}`, function (err, rows, fields) {
                    if (!err) {
                        if(rows != null) {
                            console.log('The fetched seats are: ' + JSON.stringify(rows));
                            allSeats = JSON.parse(JSON.stringify(rows));
                            res.json(allSeats);
                            connection.release();
                            resolve(true);
                        } else {
                            console.log("No data available");
                            connection.release();
                            resolve(false);
                        }
                    } else {
                        console.log(err);                        
                    }
                });
            } else {
                console.log("Error in connecting to DB: " + err); 
            }
        })
    })
}

var getSeat = function(seatId) {

    return new Promise((resolve) => {
        
        var seatDetail;
        
        pool.getConnection(function(err, connection) {
            if(!err) {
                connection.query(`SELECT * FROM SEATS WHERE seatId=${seatId}`, function (err, rows, fields) {
                    if (!err) {
                        if(rows != null) {
                            console.log('The fetched seat is: ' + JSON.stringify(rows));
                            seatDetail = JSON.parse(JSON.stringify(rows));
                            res.json(seatDetail);
                            resolve(true);
                        } else {
                            console.log("No data available");
                            resolve(false);
                        }
                    } else {
                        console.log(err);                        
                    }
                  });
            } else {
                console.log("Error in connecting to DB: " + err);
            }
        })
    })
}

exports.getSeat = getSeat;
exports.getAllSeats = getAllSeats;