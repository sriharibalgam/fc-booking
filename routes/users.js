var express = require('express');
var router = express.Router();
var user = require('../public/javascripts/userController');

/* GET users listing. */
router.get('/details/:id', function(req, res, next) {

  var user_id = req.params.id ;

  res.send('respond with a resource');
});

module.exports = router;
