const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const router = require('./routes/route');

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Autharization');
    next();
})

app.use(router);

mongoose.connect('mongodb+srv://overtimes:lkPSVcDT8XOoSvQU@cluster0-lbr9c.mongodb.net/overtime?retryWrites=true')
.then( result => {
    console.log('App is running..')
    app.listen(8080)
})
.catch(error=>{
    console.log(error)
})
