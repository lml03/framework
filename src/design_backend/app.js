var express = require('express');
var bodyParser = require('body-parser');
//var multer = require('multer');

var app = express();
var api = require('./route/api');

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
//app.use(multer()); // for parsing multipart/form-data

app.get('/', function (req, res) {
    res.send('Hello World!');
});

app.use('/api', api);

var server = app.listen(8125, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});