var isLocal = false;

var express = require('express');
var fs = require('fs');
var stylus = require('stylus');
var nib = require('nib');
var jade = require('jade');

var app = express();

function compile(str, path) {
  return stylus(str)
    .set('filename', path)
    .set('compress', true)
    .use(nib());
}

app.use(stylus.middleware({
    src: __dirname + '/public'
  , compile: compile
}));

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use('/public', express.static(__dirname + '/public'));

app.get('/', function(req, res){
    res.render('index', {});
});
app.get('/about', function(req, res){
    res.render('about', {});
});
app.get('/resume', function(req, res){
    var resume=__dirname + "/public/JustinCarrus.pdf";
    fs.readFile(resume, function (err,data){
	res.contentType("application/pdf");
	res.send(data);
    });
});
app.get('/daq', function(req, res){
    res.render('daq', {});
});
app.get('/infocycle', function(req, res){
    res.render('infocycle', {});
});
app.get('/rockers', function(req, res){
    res.render('rockers', {});
});
app.get('/tracksim', function(req, res){
    res.render('tracksim', {});
});
app.get('/approach', function(req, res){
    res.render('approach', {});
});
app.get('/charcoal', function(req, res){
    res.render('charcoal', {});
});

// Budget Application
app.get('/budget', function(req, res){
    res.sendFile(__dirname + '/views/Budget.html');
});

// Freshman stalking app
//app.use('/rush', require('./freshman-stalking/rushWeek/app').app);

if (isLocal){
    app.listen(3000, function() {
	console.log('listening on 3000');
    });
} else {
    module.exports = app;
}
