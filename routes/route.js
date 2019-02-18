const express = require('express');
const {body} = require('express-validator/check');
const User = require('../models/user');
const controller = require('../controllers/main');

const router = express.Router();

router.get('/', (req, res, next) => {
    res.json({message:'App works!!'});
})


router.post("/login",controller.postUserLogin);

router.post("/signup",
[
    body('email').isEmail()
    .withMessage('Please enter valid email')
    /*.custom((value, {req}) => {
        User.findOne({email: value}).then(result => {
            if(result)
            return Promise.reject();
        }).catch(error=>{
            console.log(error)
        })
    })*/,
    body('password')
    .trim().isLength({min: 8})
    .not()
    .isEmpty()
],
controller.postUserSignup);

router.post("/submissions", controller.postSubmissions)

router.use((error, req, res, next) => {
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({message: message, data: data});  
})

module.exports = router;
