require('./config/config');

const express = require('express');
const bodyParser = require('body-parser');


var app = express();
const port = process.env.PORT;

app.use(bodyParser.json());


app.get('/login', (req, res) => {
    res.send({name: '323232'});
}, (error) => {
    res.status(400).send(error);
});

app.get('/signup', (req, res) => {
    res.send(req);
}, (error) => {
    res.status(400).send(error);
});


app.listen(port, () => {
    console.log(`Started up at port ${port}`);
});
  
module.exports = {app};