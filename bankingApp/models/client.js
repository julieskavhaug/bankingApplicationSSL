const mongoose = require('mongoose');

// 3. Finish the account schema
const ClientSchema = new mongoose.Schema({

    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    streetAddress: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    }
});

const model = mongoose.model('Client', ClientSchema);

module.exports = model;