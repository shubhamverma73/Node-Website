const mongoose = require('mongoose');

//Schema
const contact = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  subject: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true
  },
	date: {
		type: Date,
		default: Date.now
	}
})

//Collection create
const Contacts = new mongoose.model('Contacts', contact);
module.exports = Contacts;
