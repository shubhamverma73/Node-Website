const express = require('express');
var app = express();
const dotenv = require('dotenv');
const path = require('path');
const hbs = require('hbs');
var cookie = require('cookie-parser');
var session = require('express-session');

// =================== Calling globalMiddleWare ================
const globalMiddleWare = require('./middleware/globalMiddleWare');
//app.use(globalMiddleWare);

const envpath = path.join(__dirname, "../src/");
//console.log(envpath);
dotenv.config({ path: envpath + 'connection/config.env' });
require('./connection/db');
const PORT = process.env.PORT;

const publicPath = path.join(__dirname, '../public/assets'); //Access durect assets folder without prefix assets in css or js file calling
app.use('/', express.static(publicPath));

/* =============== HBS Template engine are using ====================== */
const pagesPath = path.join(__dirname, './pages/views');
const layoutPath = path.join(__dirname, './pages/layout');

app.set('view engine', 'hbs');
app.set('views', pagesPath);
hbs.registerPartials(layoutPath);

// =================================== Middleware use by our system ===========================================
app.use(express.urlencoded({ extended: true })); //Its subsitute of require('body-parser')
app.use(express.json());

app.use(cookie());
app.use(session({ secret: '97341@Sess!', resave: true, saveUninitialized: true }));

app.use(require('./router/home'))

//app.use('/css', express.static(path.join(__dirname, "../public/assets/")));
//app.use('/js', express.static(path.join(__dirname, "../public/assets/")));

/* ==================== Running our Node project ======================= */
//app.listen(3000, () => {
app.listen(process.env.PORT, () => { //For Hroku deployment
	console.log('Your server are running on ' + process.env.PORT);
})
