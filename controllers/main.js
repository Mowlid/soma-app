const { validationResult } = require('express-validator/check');
const bcryptjs = require('bcryptjs');
const mongoose = require('mongoose');
const User = require('../models/user');
const Submissions = require('../models/submissions')

exports.postUserLogin = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error("validation error");
        error.statusCode = 422;
        error.data = errors.array();
        throw error;
    }
    const email = req.body.email;
    const password = req.body.password;

    User.findOne({ email: email, password: password })
        .then(user => {
            if (user)
                res.json({ user: user })
            else
                res.json({ message: 'No user found with that details' });

        })
        .catch(error => {
            res.json({ message: 'There is Login problem', errorCode: error.statusCode });
        })
}

exports.postUserSignup = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const emp_id = req.body.emp_id;
    const role = req.body.role;
    const base = req.body.base;
    const isAdmin = req.body.isAdmin;
    const adminLevel = req.body.adminLevel;
    const lineManager = req.body.lineManager;

    const user = new User(
        {
            name: name,
            email: email,
            password: password,
            emp_id: emp_id,
            role: role,
            base: base,
            isAdmin: isAdmin,
            adminLevel: adminLevel,
            lineManager: lineManager
        })
    user.save()
        .then(result => {
            res.status(201).json({ message: 'User is successfully created' })
        })
        .catch(error => {
            if (!error.statusCode) {
                error.statusCode = 500
            }
            next(error);
        })
}

exports.postSubmissions = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    const emp_id = req.body.emp_id;
    const overtimes = req.body.submission
    const submissions = new Submissions({
        emp_id: emp_id,
        submission: overtimes[0]
    })
    Submissions.findOne({ emp_id: emp_id })
        .then(result => {
            
            res.status(201).json({ message: result.submission[0].month })
        })
        .catch(error => {
            if (!error.statusCode) {
                error.statusCode = 500
            }
            next(error);
        })
}

