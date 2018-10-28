var express = require('express');
var mysql = require('mysql');

var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'getpi3dt_fc',
    password : 'Booking1234',
    database : 'getpi3dt_fcbooking'
  });

connection.connect();

connection.query('SELECT empId, empName FROM USERS', function (err, rows, fields) {
  if (err) throw err

  console.log('The fetched users are: ', rows[0].solution)
});

connection.end();