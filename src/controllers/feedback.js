const common_helper = require('../helper/common_helper');

exports.feedback = async (req, res) => {
	try {
		res.render('feedback', {
			pageTitle: "Feedback Page"
		});
	} catch (e) {
		common_helper.handleError(req, res, 'Getting some error ' + e);
	}
}

exports.feedback_data = async (req, res, next) => {
	try {
		const { name, email, subject, message } = req.body;
		const msg = 'success';
		res.redirect(`/feedback?message=${msg}`);
	} catch (err) {
		common_helper.handleError(req, res, 'Getting some error ' + e);
	}
}
