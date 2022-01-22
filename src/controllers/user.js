const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User_model = require('../models/User_model');
const common_helper = require('../helper/common_helper');

exports.login_page = async (req, res) => {
	try {
		res.render('user/login', {
			pageTitle: "Login Page"
		});
	} catch (e) {
		common_helper.handleError(req, res, 'Getting some error ' + e);
	}
}

exports.login = async (req, res) => {
	try {
		const { email, password } = req.body;
		const isValidEmail = validator.isEmail(email);

		if (!email || !password) {
			common_helper.handleError(req, res, 'Some fields are missing, please check and try again..');
		} else {
			if (isValidEmail === false) {
				common_helper.handleError(req, res, 'Email address not valid.');
			} else {

				const result = await User_model.findOne({ email: email });
				const isMatch = await bcrypt.compare(password, result.password);

				// ====================== Genereating Token and save it for corresponding user ====================
				const token = jwt.sign({ _id: result._id.toString() }, process.env.SECRET_KEY);
				result.tokens = result.tokens.concat({ token: token });
				await result.save();
				// ====================== Genereating Token and save it for corresponding user ====================

				if (isMatch) {
					// ====================== Creating Cookie using Generated Token ====================
					res.cookie("jwt", token, {
						expires: new Date(Date.now() + 60000000), //for a year.
						httpOnly: true,
						secure: false
					});
					// ====================== Creating Cookie using Generated Token ====================

					var userData = await User_model.findOne({ email: email }, { fname: 1, lname: 1, role: 1, email: 1 });
					return res.redirect('/');
				} else {
					res.redirect('/?msg=Invalid credentials, please try again.');
				}
			}
		}

	} catch (err) {
		common_helper.handleError(req, res, 'Getting some error ' + e);
	}
}

exports.logout = async (req, res) => {
	try {
		//forCookie are getting from auth middleware
		req.forCookie.tokens = req.forCookie.tokens.filter((currentElement) => {
			return currentElement.token !== req.token //Return all tokens except current token
		});
		res.clearCookie("jwt", { path: '/' });
		await req.forCookie.save(); // save all tokens again into same document
		res.redirect('/?msg=successfully logout.');

	} catch (e) {
		common_helper.handleError(req, res, 'Getting some error ' + e);
	}
}

exports.logoutFromAll = async (req, res) => {
	try {
		req.forCookie.tokens = []; //It will remove all tokens from documents
		res.clearCookie("jwt", { path: '/' });
		await req.forCookie.save(); // save all tokens again into same document
		res.redirect('/?msg=successfully logout from all.');

	} catch (e) {
		common_helper.handleError(req, res, 'Getting some error ' + e);
	}
}
