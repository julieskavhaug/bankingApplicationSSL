const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const db = require('./db/db.js');
const https = require('https');
const path = require('path');
const fs = require('fs');
const seaConnect = require('seaport');
const seaPortConnect = seaConnect.connect('localhost', 9090);

//Added Json Body-parser
app.use(bodyParser.json());

//Import Routes
const accountRoute = require('./routes/accounts');
const clientRoute = require('./routes/clients');

//const { db } = require('./models/account');
app.use('/accounts', accountRoute);
app.use('/clients', clientRoute);

app.use('/', (req, res) => {
    res.json("This is the banking app");
});

const sslServer = https.createServer({
    key: fs.readFileSync(path.join(__dirname, './SSL/cert', 'key.pem')),
    cert: fs.readFileSync(path.join(__dirname, './SSL/cert', 'cert.pem')),
    secure: false
}, app);

//connect the http server to seaport and mongodb.
sslServer.listen(seaPortConnect.register('server'), () => {
    db.getConnection().then(function(){
        console.log("you are connected to db")});
        console.log('Server listening on 8080');
        console.log("On port: " + sslServer.address().port);
});
