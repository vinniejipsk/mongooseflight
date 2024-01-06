const modelFlights = require('../models/flight');

module.exports = {
    getDes,
    createDes,
}

async function getDes(req, res) {

    const flightData = await modelFlights.getOne(req.params.id)
    ;
    if (!flightData || flightData === "no flight with such destination") {
        res.status(404).render("error", { message: "no flight with such destination" })
    } else {
        res.json(flightData.destinations);
    }
}

async function createDes(req, res) {
    const flight = await modelFlights.getOne(req.params.id);
    flight.destinations.push(req.body);
    try {
        await flight.save();
    } catch (err) {
        res.status(500).json({ err })
    }
    res.status(201).json(flight)
}