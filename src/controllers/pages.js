const common_helper = require('../helper/common_helper');

exports.page = async (req, res) => {
	try {
		res.render('page', {
			pageTitle: "Feedback Page",
			pageNo: req.params.id,
			Session: req.session.counter,
			Uname: req.session.uname,
		});
	} catch (e) {
		common_helper.handleError(req, res, 'Getting some error ' + e);
	}
}

exports.cookie = (req, res) => {
	try {
		res.cookie('name', 'Shubham Verma');
		res.send(req.cookies.name); //It will call 2nd time time page refreh because first time it set
	} catch (e) {
		common_helper.handleError(req, res, 'Getting some error ' + e);
	}
}

exports.session = (req, res) => {
	try {
		if (req.session.counter) {
			req.session.counter++;
			res.send('Counter is: ' + req.session.counter + ' and Uname is: ' + req.session.uname);
		} else {
			req.session.counter = 1;
			req.session.uname = 'Shubham';
			res.send('Counter Initial value is: ' + req.session.counter);
		}
	} catch (e) {
		common_helper.handleError(req, res, 'Getting some error ' + e);
	}
}
