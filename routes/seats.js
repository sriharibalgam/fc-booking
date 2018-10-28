var express = require('express');
var router = express.Router();
var seatController = require('../public/javascripts/seatController');

/**
 * GET all seats for a given fcId and slotId
 */
router.get('/getAllSeats/fc=:fcId/slot=:slotId', function(req, res, next) {

    var fcId = req.param('fcId');
    var slotId = req.param('slotId');
    
    seatController.getAllSeats(slotId, fcId).then(
        console.log('All Seat fetched successfully')
    ).catch((err) => {
        console.log("Error while retrieving seats: " + err);
    })
});

/**
 * GET Seat from DB for a given seatId 
 */
router.get('/getSeat/seat=:seatId', function(req, res, next) {

    var seatId = req.param('seatId');

    console.log(`GET allSeats for Seat${seatId}`);

    seatController.getSeat(seatId).then(
        console.log('Seat details fetched successfully')
    ).catch((err) => {
        console.log("Error while retrieving Seat details: " + err);
    })
    
});

module.exports = router;
