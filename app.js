var isLocal = false;

var express = require('express');
var fs = require('fs');
var stylus = require('stylus');
var nib = require('nib');
var jade = require('jade');
var where = require('node-where');

var app = express();

function compile(str, path) {
  return stylus(str)
    .set('filename', path)
    .set('compress', true)
    .use(nib());
}

app.use(function(req, res, next){
    if (req.path.indexOf('/public/') != -1) return next();
    where.is(req.ip, function(err, result) {
	if (result){
	    var d = new Date();
	    var str = d.toUTCString() + '\t' + 
		(req.ip || 'ip') + '\tfrom\t ' + 
		(result.attributes.city || 'city') + '\t' + 
		(result.attributes.region || 'region')  + '\t' + 
		(result.attributes.country || 'country')  + '\trequests\t' + 
		req.path;
	    console.log(str);
	    str += '\n';
	    fs.appendFile(__dirname + '/portfolio.log', str, function(err){
		if (err) throw err;
	    });
	} else {
	    try{
		console.log(err);
	    } catch (e){
		
	    }
	}
    });
    next();
});

app.use(stylus.middleware({
    src: __dirname + '/public'
  , compile: compile
}));

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use('/public', express.static(__dirname + '/public'));

app.get('/resume', function(req, res){
    var resume=__dirname + "/public/JustinCarrus.pdf";
    fs.readFile(resume, function (err,data){
	res.contentType("application/pdf");
	res.send(data);
    });
});

app.get('/(:page)?', function(req, res){
    if (!req.params.page){
	res.render('index', {});
    }
    res.render(req.params.page, {}, function(err, html){
	if(err){
	    res.send("404 Page not found", 404);
	}
	res.send(html);
    });
});

if (isLocal){
    app.listen(3000, function() {
	console.log('listening on 3000');
    });
} else {
    module.exports = app;
}
