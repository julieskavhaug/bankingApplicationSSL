const express = require('express');
const router = express.Router();
const Account = require('../models/account');

//Endpoint for all users
router.get('/', async (req, res) => {
    try {
        const accounts = await Account.find().exec();
        // 1. return accounts from database instead
        res.json(accounts);
    } catch (err) {
        console.log({message: err})
    };
});


//endpoint for getting the balance of one account
router.get('/:id', async (req, res) => {
    try{
        const accounts = await Account.findById(req.params.id).exec();
        res.json(accounts.balance);
    }
    catch(err){
        console.log({message: err})
    }
});


//Endpoint for adding user
router.post('/', async (req, res) => {
    const user = new Account({
        name: req.body.name,
        balance: req.body.balance
    });
    res.json(user);
});

// Implement a new endpoint, that will be able to return a specific account by id.
// instead of just printing, return the actual account.


module.exports = router;