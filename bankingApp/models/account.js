const mongoose = require('mongoose');

// 3. Finish the account schema
const AccountSchema = new mongoose.Schema({

    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    balance: Number,
    phone: String
});


const model = mongoose.model('Account', AccountSchema);

module.exports = model;