
exports.downloads = function (req, res){

	var file = '/../public/' + req.query.item;
	res.download(file);
};