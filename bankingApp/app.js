const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const db = require('./db/db.js');
const https = require('https');
const path = require('path');
const fs = require('fs');

//Added Json Body-parser
app.use(bodyParser.json());

//Import Routes
const accountRoute = require('./routes/accounts');

//const { db } = require('./models/account');
app.use('/accounts', accountRoute);

//Initial route
app.get('/', (req, res) => {
    res.send('Welcome to the banking app');
});

app.use('/', (req, res) => {
    res.json("Hey");
});

const sslServer = https.createServer({
    key: fs.readFileSync(path.join(__dirname, './SSL/cert', 'key.pem')),
    cert: fs.readFileSync(path.join(__dirname, './SSL/cert', 'cert.pem'))
}, app);

//start listening
sslServer.listen(3443, () => {
    db.getConnection().then(function(){
        console.log("you are connected to db")});
    console.log('Server listening on 3443');
});