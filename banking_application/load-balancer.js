let https = require('https')
    , httpProxy = require('http-proxy')
    , seaport = require('seaport')
    , seaPortConnect = seaport.connect('localhost', 9090);
const path = require('path');
const fs = require('fs');
let i = -1;

const options = {
    key: fs.readFileSync(path.join(__dirname, './SSL/cert', 'key.pem')),
    cert: fs.readFileSync(path.join(__dirname, './SSL/cert', 'cert.pem')),
    secure: false
};


let proxy = httpProxy.createProxyServer({secure: false});
let server = https.createServer(options, function(req, res) {
    let addresses = seaPortConnect.query('server');
    if (!addresses.length) {
        res.writeHead(503, { 'Content-Type': 'text/plain' });
        res.end('Service unavailable');
        return;
    }
    i = (i + 1) % addresses.length;
    let host = addresses[i].host.split(":").reverse()[0];
    let port = addresses[i].port;
    proxy.web(req, res, { target: 'https://' + host + ':' + port });
});

server.listen(8080, function () {
    console.log('load balancer listening on port %d', this.address().port);
});
