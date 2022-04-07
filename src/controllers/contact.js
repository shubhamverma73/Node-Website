const common_helper = require('../helper/common_helper');
// =================================== For send mail ===========================================
var nodemailer = require('nodemailer');
const Contacts = require('../models/contact_model');

exports.contact_data = async (req, res, next) => {
	try {
		const { name, email, subject, message } = req.body; // for post
		/*const { name, email, subject, message } = JSON.parse(JSON.stringify(req.query));*/

		const contactCreate = Contacts({
			name: name,
			email: email,
			subject: subject,
			message: message,
			status: 'Open',
		})

		await contactCreate.save();

		var transporter = nodemailer.createTransport({
			port: 465, // true for 465, false for other ports
			host: "smtp.sendgrid.net",
			auth: {
				user: 'apikey',
				pass: '',
			},
			secure: true,
		});

		var mailOptions = {
			from: 'testwm15@gmail.com',
			to: 'shubhamkrverma73@gmail.com',
			subject: 'Sending Email using Node.js',
			html: `<b>Hey there! </b><br/>
             You got an mail<br/>
             <br/>Name: ${name}
             <br/>Email: ${email}
             <br/>Subject: ${subject}
             <br/>Message: ${message}`,
		};

		transporter.sendMail(mailOptions, function (error, info) {
			if (error) {
				console.log(error);
			} else {
				console.log('Email sent: ' + info.response);

				//const url = req.originalUrl;
				const msg = 'success';
				res.redirect(`/?message=${msg}`);
				//next();
			}
		});
	} catch (e) {
		common_helper.handleError(req, res, 'Getting some error ' + e);
	}
}

exports.updateContacts = async (req, res) => {
	try {
		const { name, email, subject, message, status } = req.body; // for post
		if (!email) {
			common_helper.handleError(req, res, 'Email should not be blank. ');
		}

		const where = { email: email };
		const contactUpdate = {
			name: name,
			email: email,
			subject: subject,
			message: message,
			status: status,
		};
		await Contacts.updateOne(where, contactUpdate);
		common_helper.handleSuccess(req, res, 'Data updated successfully.');

	} catch (e) {
		common_helper.handleError(req, res, 'Getting some error ' + e);
	}
}

exports.updateContactsPatch = async (req, res) => {
	try {
		const { name, email, subject, message, status } = req.body;
		if (!email) {
			common_helper.handleError(req, res, 'Email should not be blank. ');
		}

		const where = { email: email };
		const contactUpdate = {
			name: name,
			email: email,
			subject: subject,
			message: message,
			status: status,
		};
		const updateData = await Contacts.updateOne(where, contactUpdate);
		if(updateData.modifiedCount > 0) {
			common_helper.handleSuccess(req, res, 'Data updated successfully...');
		} else {
			common_helper.handleError(req, res, 'Data not updated, try again.');
		}

	} catch (e) {
		common_helper.handleError(req, res, 'Getting some error ' + e);
	}
}

exports.deleteContacts = async (req, res) => {
	try {
		const { id } = req.body; // for post
		if (!id) {
			common_helper.handleError(req, res, 'Id should not be blank. ');
		}

		const where = { _id: id };
		await Contacts.deleteOne(where);
		common_helper.handleSuccess(req, res, 'Data deleted successfully.');

	} catch (e) {
		common_helper.handleError(req, res, 'Getting some error ' + e);
	}
}

exports.getContacts = async (req, res) => {
	try {
		const { status } = req.body; // for post
		if (!status) {
			common_helper.handleError(req, res, 'Status should not be blank. ');
		}

		var userData = await Contacts.find(
			{ status: status, subject: {"$nin": ["", null]} },
			//{$and: [{"subject" : {"$nin": ["", null]}}, {"subject" : {$exists: true}}]},
			//{$and: [{ "$not": { "$in": ["$subject", ["",null]] }}]},
			//{ "$not": { "$in": ["$subject", ["",null]] }},
			//{'subject': {$not: {$ne : ["", null]}}},
			//{ "subject":{$ne:""}},
			//{'asubject_key': {"$exists": true}},
			{ _id: 0, name: 1, email: 1, subject: 1, message: 1, status: 1},

			
		).sort({_id:-1});

		res.send(userData);
		//common_helper.handleSuccess(req, res, 'Data deleted successfully.');

	} catch (e) {
		common_helper.handleError(req, res, 'Getting some error ' + e);
	}
}
