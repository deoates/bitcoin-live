var express = require('express'),
    redis = require('redis'),
    http = require('http'),
    fs = require("fs");

var client = redis.createClient(6379, '18.111.18.16');
var app = express();

app.configure(function(){
    app.use(express.static(__dirname + '/public'));
});

var server = app.listen(7000);
var io = require('socket.io').listen(server);

client.subscribe("transactions");

io.sockets.on('connection', function(socket) {
  console.log('connected'+socket);
  client.on("message", function(channel, msg) {
    console.log(msg);
    socket.emit('transaction', msg);
  });
});


app.get('/', function (req, res) {
    res.sendfile(__dirname + '/index.html');
});

