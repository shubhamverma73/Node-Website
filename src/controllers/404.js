const common_helper = require('../helper/common_helper');

exports.notFound = async (req, res) => {
	try {
		res.render('404');
	} catch (e) {
		common_helper.handleError(req, res, 'Getting some error ' + e);
	}
}
