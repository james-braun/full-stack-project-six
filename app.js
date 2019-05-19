// JavaScript source code

// includes express framework in project.
const express = require('express');

// creates an express application.
const app = express();

// includes data file.
const data = require('./data.json');

// add css static assets.
app.use('/static', express.static('public'));

// installs pug templating engine.
app.set('view engine', 'pug');

// Renders home page.
app.get('/', (req, res) => {
    res.render('index', { data });
});

// Renders about page.
app.get('/about', (req, res) => {
    res.render('about', { data });
});

// Renders project pages.
app.get('/project/:id', (req, res, next) => {

    // create a varible with the "id'
    // of the project to be served.
    const id = req.params.id;

    // if user tries to go to a project that doesn't exist
    // throw an error otherwise render the project.
    if (/^[0-4]$/.test(id)) {
        res.render('project', { data, id });
    } else {
        const err = new Error('404 - Path Not Found');
        err.status = 404;
        next(err);
    }
});

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
// error to the console and redirect to 
// home page.
app.use((err, req, res, next) => {

    // create an error status code
    res.status(err.status);

    // create an error page.
    console.log(err);
    res.redirect('/');
});

// sets up the development server.
// the callback function tells what port
// the server is running on.
app.listen(3000, () => {
    console.log('The application is running on localhost:3000!');
});