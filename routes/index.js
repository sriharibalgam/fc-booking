var express = require('express');
var router = express.Router();
var loginController = require('../public/javascripts/loginController');

/* GET home page. */
router.post('/login', function(req, res, next) {

  console.log('Inside Login');
  var empId = req.body.empId;
  var empPwd = req.body.empPwd;

  

  loginController.validateLogin(empId, empPwd).then((user) => {
    if(user) {
      res.json({ status: 'SUCCESS', data: user});
    } else {
      res.json({ status: 'FAILED', message: 'Invalid Credentials'});
    }
  }).catch((err) => {
    console.log("Unable to login: " + err);
    res.send("Generic Message");
  });

  
});

module.exports = router;
