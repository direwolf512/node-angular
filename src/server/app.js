/**
 * @fileOverview
 * @author ISS
 */

var http = require('http'),
  server = http.createServer(function (req, res) {
    if  (req.url === '/articles') {
      res.send(req.url);
    }
  });

server.listen(8900);