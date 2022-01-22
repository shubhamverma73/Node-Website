const express = require('express');
const app = express();

const callMiddleware = (req, res, next) => {
  console.log('Middleware calling');
  console.log(req.params.id);
  next();
}
module.exports = callMiddleware;
