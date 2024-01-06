const modelFlights = require('../models/flight');
const daoTickets = require('../daos/ticket');

module.exports = {
    getFlight,
    getFlightSorted,
    getFlightByNo,
    getOneFlight,
    createFlight,
}

async function getFlight(req, res) {
    res.json({
        flights: await modelFlights.getAll(req.query, false),
    })
}

async function getFlightSorted(req, res) {
    res.json({
        flights: await modelFlights.getAll(req.query, true),
    })
}

async function getFlightByNo(req, res) {
    const flightData = await modelFlights.getFlightNum(req.params.flightno);
    if (flightData == "No Flight Number") {
        res.status(404).json("No Flight Number")
    } else {
        res.json(flightData);
    }
}

async function getOneFlight(req, res) {
    try {
        const flightData = await modelFlights.getOne(req.params.id);

        if (!flightData) {
            return res.status(404).json({ message: "No Flight With Such Destination" });
        }
        /// If i don't use populate. I want my ticket to show only in my id url. (GET /:id)
        const tickets = await daoTickets.find({ flight: flightData._id });
        return res.json({ flight: flightData, tickets: tickets });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ errorMsg: err.message });
    }
}

async function createFlight(req, res) {
    try {
        const flight = await modelFlights.createFlight(req.body);
        res.redirect(`/flights/${flight._id}`)
        res.status(201).json(flight);
    } catch (err) {
        console.log(err);
        res.status(500).json({ errorMsg: err.message })
    }
}