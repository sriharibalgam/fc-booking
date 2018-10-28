var express = require('express');
var router = express.Router();
var bookingController = require('../public/javascripts/bookingController');
var mysql = require('mysql');

/**
 * Book a seat for a given seatId
 */
router.post('/bookSeat', function(req, res, next) {

  var reqObj = {
    empId: req.body.empId,
    seats: req.body.seats,
    bookingTime: new Date()
  };

  console.log(`BOOK seat for Seat${JSON.stringify(reqObj)}`);

  bookingController.changeSeatStatus(reqObj.seats).then((proceed) => {
    if(proceed) {
      bookingController.updateBooking(reqObj).then((success) => {
        console.log("Booking successful");
        res.json({ status: "SUCCESS" })
      }).catch((err) => {
        console.log("Error while updating booking: " + err)
      })
    }
  }).catch((error) => {
      console.log("Error while updating seats status: " + error)
  });
  
  
});

module.exports = router;
