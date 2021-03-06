/**
 * Module dependencies.
 */

var express = require('express')
, 	routes = require('./routes')
,	downloads = require('./routes/downloads')
,	indexFeo = require('./routes/indexgetfeo')
, 	user = require('./routes/user')
, 	http = require('http')
, 	path = require('path')
, 	app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'hjs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(app.router);
app.use(require('less-middleware')({ src: __dirname + '/public' }));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.post('/calas', routes.index);
app.get('/calas', indexFeo.feo);
app.get('/downloads', function (req, res){
	var file = './public/created/' + req.query.item + '.png';
	console.log(file);
	res.download(file, 'calaveravatar.png');
});
app.get('/', function(req,res){
	res.send("Holla");
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});