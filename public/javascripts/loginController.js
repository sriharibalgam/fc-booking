var express = require('express');
var mysql = require('mysql');

var pool = mysql.createPool({
    host     : 'localhost',
    user     : 'root',
    password : 'root',
    database : 'fcbooking',
    port : '3306'
  });

var validateLogin = function(empId, empPwd) {

    return new Promise((resolve) => {

        var user;
        console.log(`Validate login for FC: ${empId}`);

        pool.getConnection(function(err, connection) {
            if (!err) {
                connection.query(`SELECT empId, empPwd FROM USERS WHERE empId=${empId} AND empPwd="${empPwd}"`, function (err, rows, fields) {
                    if (err) {
                        console.log(err);
                    } else {
                        
                        if(rows != null && rows != undefined && rows != '') {
                            console.log('Login Successfull: ' + JSON.stringify(rows));
                            user = JSON.parse(JSON.stringify(rows));
                            connection.release();
                            resolve(user);
                        } else {
                            console.log("No data available");
                            connection.release();
                            resolve(false);
                        }
                    }
                });
            } else {
                console.log("Error in connecting to DB: " + err)
            }
        })        
    });
}

exports.validateLogin = validateLogin;