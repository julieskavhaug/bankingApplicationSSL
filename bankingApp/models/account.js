const mongoose = require('mongoose');

// 3. Finish the account schema
const AccountSchema = new mongoose.Schema({

    balance: Number,
    alias: String,
    client_id: {
        type: String,
        required: true,
    }
});


const model = mongoose.model('Account', AccountSchema);

module.exports = model;