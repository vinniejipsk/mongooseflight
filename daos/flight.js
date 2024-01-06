const destinationSchema = require('./destination');

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Create my "blueprint" for my models.
const flightSchema = new Schema ({
    airline: {
        type: String,
        enum:['America', 'Canada', 'Alaska', 'Brazil', 'Argentina'],
        default: null
    },
    airport: {
        type: String,
        enum: ['AUS', 'DFW', 'DEN', 'LAX', 'SAN'],
        default: "DEN"
    },
    flightno: {
        type: Number,
        required: true,
        default: null,
        min: 10,
        max: 9999
    },
    departs: {
        type: Date,
        default: () => {
            const oneYearFromNow = new Date();
            oneYearFromNow.setFullYear(oneYearFromNow.getFullYear() + 1);
            return oneYearFromNow;
        }
    },
    destinations: [destinationSchema],

    // tickets: [{
    //     type: Schema.Types.ObjectId,
    //     ref: 'Ticket'
    // }]
});

module.exports = mongoose.model('Flight', flightSchema)