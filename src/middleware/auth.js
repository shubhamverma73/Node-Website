const jwt = require('jsonwebtoken');
const User_model = require('../models/User_model');
const cookie_helper = require('../helper/cookie_helper');
const common_helper = require('../helper/common_helper');

const auth = async (req, res, next) => {
	try {
		var token = cookie_helper.cookie(req, res, 'jwt');
		const verifyUser = jwt.verify(token, process.env.SECRET_KEY);
		const rootUser = await User_model.findOne({ _id: verifyUser._id, "tokens.token": token });

		if (!rootUser) {
			throw new Error('User not Found');
		} else {
			req.token = token;
			req.forCookie = rootUser; //For store all data again except recent token data after logout
			req.userID = rootUser._id;
			next();
		}
	} catch (e) {
		common_helper.handleError(req, res, 'Unauthorized  Access: Token not found. ' + e);
	}
}
module.exports = auth;
