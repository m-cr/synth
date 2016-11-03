var express = require('express');
var app = express();
var morgan = require('morgan');
var path = require('path');

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'dist')));

app.use(function(req, res){
	res.sendFile(path.join(__dirname, "/dist/index.html"));
});

app.use(function (err, req, res, next) {
    console.error(err, typeof next);
    console.error(err.stack);
    res.status(err.status || 500).send(err.message || 'Internal server error.');
});

app.listen(process.env.PORT || 9000);
// var server = require('http').createServer(app);
// server.listen(process.env.PORT || 9000, function(){
// 	console.log('listening on port' + process.env.PORT);
// });