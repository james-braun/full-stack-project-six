// JavaScript source code

// includes express framework in project.
const express = require('express');

// creates an express application.
const app = express();

var favicon = require('serve-favicon');
var path = require('path');
app.use(favicon(path.join(__dirname, 'public/img/favicon_io', 'favicon.ico')))

// includes data file.
const data = require('./data.json');

// add css static assets.
app.use('/static', express.static('public'));

// installs pug templating engine.
app.set('view engine', 'pug');

const routes = require('./routes');

app.use(routes);

// if route has made it this far without 
// matching a route. create an error object.
// create an error status and goto
// 'error handling funtion'
app.use((req, res, next) => {
    const err = new Error('404 - Path Not Found');
    err.status = 404;
    next(err);
});

// use 'error handling function' to print
// error to the console and render 
// error page.
app.use((err, req, res, next) => {

    // create an error status code
    res.status(err.status);

    // create an error page.
    console.log(err.message);
    res.render('error', { data, err });
});
// sets up the development server.
// the callback function tells what port
// the server is running on.
app.listen(3000, () => {
    console.log('The application is running on localhost:3000!');
});