const daoFlights = require('../daos/flight');

module.exports = {
    getAll,
    getFlightNum,
    getOne,
    createFlight,
}

async function getAll(query, sorted = false) {
    var findQuery = {}
    var queryFields = ['_id', 'airline', 'airport', 'flightno', 'departs']
    for (field of queryFields) {
        console.log(field);
        if (query.hasOwnProperty(field)) {
            findQuery[field] = query[field];
        }
    }
    try {
        let queryChain = daoFlights.find(findQuery);
        // Sorted code! Make it simple but putting it here.
        if (sorted) {
            queryChain = queryChain.sort({ departs: 1 });
        }
        const flights = await queryChain;
        return flights;
    } catch (err) {
        console.error(err);
    }
}

async function getFlightNum(num) {
    try {
        const data = await daoFlights.findOne({ flightno: num });
        if (!data) {
            return "No Flight Number";
        } else {
            return data;
        }
    } catch (err) {
        console.error(err);
    }
}

async function getOne(id) {
    try {
        const data = await daoFlights.findOne({ _id: id });
        if (!data) {
            return "No Flight With Such Destination";
        } else {
            return data;
        }
    } catch (err) {
        console.error(err);
    }
}

function createFlight(flight) {
    return daoFlights.create(flight);
}