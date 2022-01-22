//handle email or username duplicates
exports.handleError = function (err, res, msg) {
	const code = 400;
	const errorMSG = msg != '' ? msg : err;
	res.setHeader('Content-Type', 'application/json');
	res.status(code).send(JSON.stringify({ status: code, data: [], message: errorMSG }));
}

exports.handleSuccess = function (req, res, msg) {
	const code = 200;
	res.setHeader('Content-Type', 'application/json');
	res.status(code).send(JSON.stringify({ status: code, data: [], message: msg }));
}

exports.handleData = function (req, res, result) {
	const code = 200;
	res.setHeader('Content-Type', 'application/json');
	res.status(code).send(JSON.stringify({ status: code, data: result, message: '' }));
}
