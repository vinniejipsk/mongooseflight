const modelFlights = require('../models/flight');
const daoTickets = require('../daos/ticket');

module.exports = {
    createTicket
}

async function createTicket(req, res) {
    try {
        const flightData = await modelFlights.getOne(req.params.id);
        if (!flightData) {
            return res.status(404).json({ errorMsg: 'Flight not found' });
        }

        let ticket = new daoTickets({
            seat: req.body.seat,
            price: req.body.price,
            flight: req.params.id
        });

        await ticket.save();

        res.redirect('/flights/' + req.params.id);

    } catch (err) {
        console.log(err);
        res.status(500).json({ errorMsg: err.message });
    }
}