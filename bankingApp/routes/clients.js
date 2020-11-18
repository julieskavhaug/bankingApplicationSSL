const express = require('express');
const router = express.Router();
const Client = require('../models/client');

//Endpoint for all users
router.get('/', async (req, res) => {
    try {
        const clients = await Client.find().exec();
        // 1. return clients from database
        res.json(clients);
    } catch (err) {
        console.log({message: err})
    }
});


//Endpoint for adding user
router.post('/', async (req, res) => {
    const user = await Client.create({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        streetAddress: req.body.streetAddress,
        city: req.body.city
    });
    res.json(user);
});


// Implement a new endpoint, that will be able to return a specific account by id.
// instead of just printing, return the actual account.
router.get('/:id', async (req,res) =>{


        let client = await Client.findById(req.params.id);
        console.log(client);

    try {
       await  res.json(client);


    }catch(e) {
        console.log({message: e})
    }

});


//Endpoint for updating the client by ID
router.put('/:id', async (req, res) => {

    let update = req.body;
    let clients = await Client.findByIdAndUpdate(req.params.id, {$set: update}, {new: true});

    res.json(clients);
});

router.delete('/:id', async (req, res) => {

    let Delete = req.body;
    let clients = await Client.findByIdAndDelete(req.params.id, {$set: Delete});
    res.json(clients);
});


module.exports = router;
