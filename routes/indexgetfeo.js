
/*
 * GET home page.
 */
var im = require('../imagemagick');

exports.feo = function(req, res){
	//res.render('index', { title: req.body.tx });
	
	req.accepts('application/json');
	var POST =  req.query,
		colors = [
			"amarilla.png",
			"aqua.png",
			"morada.png",
			"roja.png"
		],
		url = [
			"afro/",
			"ciclista/",
			"deportista/",
			"emo/",
			"fresa/",
			"hipster/",
			"rapero/",
			"rasta/",
			"rockera/",
			"seniora/"
		],
		color = colors[POST.cc],
		type = url[POST.cu],
		back = POST.bk,
		path = 'type/' + type + color,
		label = 'label:"' + POST.tx + '"',
		output = 'public/created/' + new Buffer(POST.cu + POST.cc + label).toString('base64') + ".png",
		response = {},
		textColor = "",
		position = "",
		arc = "30";

	console.log(path);

	if(POST.cc == 0 && POST.cu == 1)
		textColor = "#b81817";
	else if(POST.cc != 0 && POST.cu == 1)
		textColor = "#ffffff";
	else if(POST.cc != 0 && POST.cu == 2)
		textColor = "#fff";
	else if(POST.cc == 0 && POST.cu == 2)
		textColor = "#844291";
	else if(POST.cc == 3 && POST.cu == 3)
		textColor = "#b81817";
	else if(POST.cu == 3)
		textColor = "#844291";
	else if(POST.cc == 0 && POST.cu == 4)
		textColor = "#844291";
	else if(POST.cc != 0 && POST.cu == 4)
		textColor = "#ffffff";
	else if(POST.cc == 0 && POST.cu == 5)
		textColor = "#248eac";
	else if(POST.cc == 1 && POST.cu == 5)
		textColor = "#248eac";
	else if(POST.cc == 2 && POST.cu == 5)
		textColor = "#844291";
	else if(POST.cc == 3 && POST.cu == 5)
		textColor = "#b81817";
	else if(POST.cu == 6)
		textColor = "#ffffff";
	else if(POST.cc == 0 && POST.cu == 7)
		textColor = "#b81817";
	else if(POST.cc == 1 && POST.cu == 7)
		textColor = "#844291";
	else if(POST.cc == 2 && POST.cu == 7)
		textColor = "#ffffff";
	else if(POST.cc == 3 && POST.cu == 7)
		textColor = "#61af20";
	else if(POST.cc == 0 && POST.cu == 8)
		textColor = "#b81817";
	else if(POST.cc == 1 && POST.cu == 8)
		textColor = "#248eac";
	else if(POST.cc == 2 && POST.cu == 8)
		textColor = "#ffffff";
	else if(POST.cc == 3 && POST.cu == 8)
		textColor = "#ffffff";
	else if(POST.cc == 0 && POST.cu == 9)
		textColor = "#b81817";
	else if(POST.cc == 1 && POST.cu == 9)
		textColor = "#844291";
	else textColor = "#f1bf7f";

	switch(POST.cu){
		case '0': position = '+50-25';
				  arc = '30';
		break;
		case '1': position = '+30-75';
				  arc = '1';
		break;
		case '2': position = '+59-90';
				  arc = '30';
		break;
		case '3': position = '+39-145';
				  arc = '70';
		break;
		case '4': position = '+50-95';
				  arc = '60';
		break;
		case '5': position = '+35-80';
				  arc = '30';
		break;
		case '6': position = '+45-80';
				  arc = '40';
		break;
		case '7': position = '+50-100';
				  arc = '40';
		break;
		case '8': position = '+90-110';
				  arc = '40';
		break;
		case '9': position = '+15-120';
				  arc = '40';
		break;
	}

	im.convert([
		'(',
			path,
			'-background', POST.bk,
			'-alpha', 'remove',
		')',
		'(',
			'-gravity', 'center',
			'-pointsize','40',
			'-background', 'transparent',
			'-font', 'font.ttf',
			'-fill', textColor,
			'-pointsize', '40',
			label,
			'-virtual-pixel', 'transparent',
			'-distort', 'Arc', arc,
			'-geometry', position,
		')',
		'-composite', output
	],
		function(err, stdout){
			if (err){
				console.log("" + err);
				response["success"] = false;
				response["url"] = "";			
				response["callback"] = POST.callback;
				res.header("Access-Control-Allow-Origin", "*");
	    		res.header("Access-Control-Allow-Headers", "X-Requested-With");
				res.send(200, response);
			}
			else{
				console.log('out:', output);
				response["success"] = true;
				response["url"] = output;			
				response["callback"] = POST.callback;
				//res.send(200, response);
				res.header("Access-Control-Allow-Origin", "*");
	    		res.header("Access-Control-Allow-Headers", "X-Requested-With");
				//res.writeHead(200, {"Content-Length": JSON.stringify(response).length });
				//res.write("NOMAMEMSM");
				//res.write(JSON.stringify(response));
				//res.end();
				//console.log("end");
				
				res.send(200, response);
			}
		}
	);
};