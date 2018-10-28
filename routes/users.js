var express = require('express');
var router = express.Router();
var user = require('../public/javascripts/userController');

var express = require('express');
var mysql = require('mysql');

var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'root',
    database : 'fcbooking',
    port : '3306'
  });

/* GET users listing. */
router.get('/allUsers', function(req, res, next) {

  var allUsers;

  console.log("In getAllUsers");
  connection.connect( function(err, success) {
    if(err) {
      console.log("Error in connecting to DB: " + err);
    } else {
      console.log("Connection successful");
    }

  });

  connection.query('SELECT * FROM USERS', function (err, rows, fields) {
    if (err) console.log(err);

    if(rows != null) {
      console.log('The fetched users are: ' + JSON.stringify(rows));
      allUsers = JSON.parse(JSON.stringify(rows));
      res.json(allUsers);
    }
    
  });


  connection.end();
  // res.send('respond with a resource' + allUsers);
});

module.exports = router;
