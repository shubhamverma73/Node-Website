const common_helper = require('../helper/common_helper');

exports.index = async (req, res) => {
	try {
		res.render('index', {
			pageTitle: "Home Page"
		});
	} catch (e) {
		common_helper.handleError(req, res, 'Getting some error ' + e);
	}
}
