const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Create my "blueprint" for my models.
const destinationSchema = new Schema ({
    airport: {
        type: String,
        enum:['AUS', 'DFW', 'DEN', 'LAX', 'SAN'],
        default: null
    },
    arrival: {
        type: Date,
        default: null
    }
});

module.exports = destinationSchema;