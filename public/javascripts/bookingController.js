var express = require('express');
var mysql = require('mysql');

var pool = mysql.createPool({
    host     : 'localhost',
    user     : 'root',
    password : 'root',
    database : 'fcbooking',
    port : '3306'
  });

var changeSeatStatus = function(seats) {

    return new Promise((resolve) => {
        console.log("Change seat status");

        singleSeats = seats.split(',');

        pool.getConnection(function(err, connection) {
            if(!err) {
                singleSeats.forEach(seat => {
                    console.log("Update query: " + seat);
                    connection.query(`UPDATE SEATS SET seatStatus='booked' WHERE seatId=${Number(seat)};`, function(err, success) {
                        if(err) {
                            console.log("Error while changing seat status: " + err);
                        } else {
                            console.log("Change seat status sucessfull");
                        }
                    });
                });
                connection.release()
                resolve(true);
            } else {
                console.log("Error in connecting to DB: " + err)
            }
        })
        
    })
    
}

var updateBooking = function(reqObj) {

    console.log(reqObj, JSON.stringify(reqObj));
    return new Promise((resolve) => {

        pool.getConnection(function(err,connection) {
            if(!err) {
                connection.query(`INSERT INTO BOOKING (empId,seats,bookingTime)
                VALUES (${reqObj.empId},'${reqObj.seats}','${reqObj.bookingTime}');`, function (err, rows, fields) {
                if (err) {
                    console.log(err);
                } else {
                    connection.commit();
                    console.log(`Seat ${reqObj.seats} is booked successfully`);
                    connection.release();
                    resolve(true);
                    }
                });
            } else {
                console.log("Error in connecting to DB: " + err)
                connection.release();
            }
        })
    })
    
}

exports.changeSeatStatus = changeSeatStatus;
exports.updateBooking = updateBooking;