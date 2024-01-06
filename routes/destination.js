var express = require('express');
var router = express.Router();

var destinationController = require('../controllers/destination')

router.get('/flights/:id/destinations', destinationController.getDes)

router.post('/flights/:id/destinations', destinationController.createDes);

module.exports = router;