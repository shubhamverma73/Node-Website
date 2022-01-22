const express = require('express');
const app = express();

const globalMiddleWare = (req, res, next) => {
	console.log('Global Middleware');
	next();
}
module.exports = globalMiddleWare;
