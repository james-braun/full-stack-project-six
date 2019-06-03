const express = require('express');
const router = express.Router();
const data = require('../data.json');

// Renders home page.
router.get('/', (req, res) => {
    res.render('index', { data });
});

// Renders about page.
router.get('/about', (req, res) => {
    res.render('about', { data });
});

// Renders project pages.
router.get('/project/:id', (req, res, next) => {

    // create a varible with the "id'
    // of the project to be served.
    const id = req.params.id;

    // create a regular expression to test for project existance.
    var regularExpression = new RegExp(`^[0-${data.projects.length - 1}]$`)

    // if user tries to go to a project that doesn't exist
    // throw an error otherwise render the project.
    if (regularExpression.test(id)) {
        res.render('project', { data, id });
    } else {
        const err = new Error('404 - Path Not Found');
        err.status = 404;
        next(err);
    }
});

module.exports = router;
