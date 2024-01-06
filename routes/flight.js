var express = require('express');
var router = express.Router();

var flightController = require('../controllers/flight')
var ticketController = require('../controllers/ticket')

router.get('/data', flightController.getFlight);

router.get('/data/sorted', flightController.getFlightSorted);

router.get('/data/flightno/:flightno', flightController.getFlightByNo);

router.get('/:id', flightController.getOneFlight);

router.post('/create', flightController.createFlight);

router.post('/:id/tickets/new', ticketController.createTicket);

module.exports = router;