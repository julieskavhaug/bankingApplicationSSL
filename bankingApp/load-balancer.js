let http = require('http')
    , httpProxy = require('http-proxy')
    , seaport = require('seaport')
    , seaPortConnect = seaport.connect('localhost', 9090);

let i = -1;

let proxy = httpProxy.createProxyServer({});
let server = http.createServer(function(req, res) {
    let addresses = seaPortConnect.query('server');
    if (!addresses.length) {
        res.writeHead(503, { 'Content-Type': 'text/plain' });
        res.end('Service unavailable');
        return;
    }
    i = (i + 1) % addresses.length;
    let host = addresses[i].host.split(":").reverse()[0];
    let port = addresses[i].port;
    proxy.web(req, res, { target: 'https//' + host + ':' + port });
});

server.listen(seaPortConnect.register('server'), function () {
    console.log('load balancer listening on port %d', this.address().port);
});
