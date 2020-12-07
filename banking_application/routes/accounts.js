const express = require('express');
const router = express.Router();
const Account = require('../models/account');

//Endpoint for all accounts
router.get('/', async (req, res) => {
    try {
        const accounts = await Account.find().exec();
        // 1. return accounts from database
        res.json(accounts);
    } catch (err) {
        console.log({message: err})
    }
});

//endpoint for getting the balance of one account. Remember this is from accounts/
router.get('/:id', async (req, res) => {
    let account = await Account.findById(req.params.id);
    console.log(account);
    try {
        await res.json(account);
    }catch(e) {
        console.log({message: e})
    }
});


//return the balance of the account with a specific ID
router.get('/:id/balance', async (req, res) => {
    try{
        const accounts = await Account.findById(req.params.id).exec();
        res.json('Balance: ' + accounts.balance);
        console.log('Balance')
    }
    catch(err){
        console.log({message: err})
    }
});


//Endpoint for adding user
router.post('/', async (req, res) => {
    const account = await Account.create({
        balance: req.body.balance,
        alias: req.body.alias,
        client_id: req.body.client_id
    });
    res.json(account);
});


//endpoint for transferring money
router.put('/transfer', async(req,res) =>{

    let fromAccount = await Account.findById(req.body.fromAccount);
    let toAccount = await Account.findById(req.body.toAccount);
    let amount = await req.body.amount;

    if(fromAccount.balance < amount){
        res.sendStatus(403);
        return 0;
    }

    else {
        let fromBalance = fromAccount.balance - amount;
        let toBalance = toAccount.balance + amount;

         await Account.findByIdAndUpdate(fromAccount.id, {"balance": fromBalance});
         await Account.findByIdAndUpdate(toAccount.id, {"balance": toBalance});

         res.json(amount);
    }
});


//Endpoint for updating the account by ID
router.put('/:id', async (req, res) => {

    let update = req.body;
    let accounts = await Account.findByIdAndUpdate(req.params.id, {$set: update}, {new: true});

    res.json(accounts);
});


//delete an account with the specific ID
router.delete('/:id', async (req, res) => {

    let Delete = req.body;
    let accounts = await Account.findByIdAndDelete(req.params.id, {$set: Delete});
    res.json(accounts);
});


module.exports = router;
