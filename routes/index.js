
/*
 * GET home page.
 */
var im = require('../imagemagick');

exports.index = function(req, res){
	//res.render('index', { title: req.body.user });
	var POST =  req.body,
		colors = [
			"amarilla.png",
			"aqua.png",
			"morada.png",
			"roja.png"
		],
		url = [
			"ema/",
			"ciclista/"
		],
		color = colors[POST.cc],
		type = url[POST.cu],
		path = 'type/' + type + color,
		label = 'label:"' + POST.tx + '"',
		output = 'public/created/' + new Buffer(POST.cu + POST.cc + label).toString('base64') + ".png",
		response = {};
	im.convert([
		path,
		'(',
			'-gravity', 'center',
			'-pointsize','40',
			'-background', 'transparent',
			'-font', 'font.ttf',
			'-fill', '#dd61d0',
			'-pointsize', '40',
			label,
			'-virtual-pixel', 'transparent',
			'-distort', 'Arc', '30',
			'-geometry', '+50-50', ')',
			'-composite', output
		],
		function(err, stdout){
			if (err) throw err;
			console.log('out:', output);
			response["success"] = true;
			response["url"] = output;
			res.send(200, response);
			//res.writeHead(200, {"Content-Type": "text/plain", "Content-Length": JSON.stringify(response).length });
			//res.write("NOMAMEMSM");
			//res.write(JSON.stringify(response));
			//res.end();
			//console.log("end");
			
		}
	);
};