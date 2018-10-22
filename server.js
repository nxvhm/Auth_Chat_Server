require('./config/config');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const User       = require('./models/user');
const Controllers = require('./Controllers/Controllers');

console.log(process.env.MONGODB_URI);
mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true});

var app = express();
const port = process.env.PORT;

app.use(bodyParser.json());


app.post('/login', Controllers.AuthController.login, (error) => {
    res.status(400).send(error);
});

app.post('/signup', Controllers.AuthController.signup, (error) => {
    res.status(400).send(error);
});

app.get('/users/active', (req, res) => {

    let userList = [
        {name: 'Rachel', 'avatar': '/images/avatar/small/rachel.png'},
        {name: 'Lindsay', 'avatar': '/images/avatar/small/lindsay.png'},
        {name: 'Matthew', 'avatar': '/images/avatar/small/matthew.png'},
        {name: 'Jenny Hess', 'avatar': '/images/avatar/small/jenny.jpg'},
        {name: 'Veronika Ossi', 'avatar': '/images/avatar/small/veronika.jpg'},
        {name: 'Rachel', 'avatar': '/images/avatar/small/rachel.png'},
        {name: 'Lindsay', 'avatar': '/images/avatar/small/lindsay.png'},
        {name: 'Matthew', 'avatar': '/images/avatar/small/matthew.png'},
        {name: 'Jenny Hess', 'avatar': '/images/avatar/small/jenny.jpg'},
        {name: 'Veronika Ossi', 'avatar': '/images/avatar/small/veronika.jpg'},
        {name: 'Rachel', 'avatar': '/images/avatar/small/rachel.png'},
        {name: 'Lindsay', 'avatar': '/images/avatar/small/lindsay.png'},
        {name: 'Matthew', 'avatar': '/images/avatar/small/matthew.png'},
        {name: 'Jenny Hess', 'avatar': '/images/avatar/small/jenny.jpg'},
        {name: 'Veronika Ossi', 'avatar': '/images/avatar/small/veronika.jpg'},
        {name: 'Rachel', 'avatar': '/images/avatar/small/rachel.png'},
        {name: 'Lindsay', 'avatar': '/images/avatar/small/lindsay.png'},
        {name: 'Matthew2', 'avatar': '/images/avatar/small/matthew.png'},
        {name: 'Jenny Hess2', 'avatar': '/images/avatar/small/jenny.jpg'},
        {name: 'Veronika Ossi2', 'avatar': '/images/avatar/small/veronika.jpg'}                        
      ];  

    res.send(userList)
}, (error) => {
    res.status(400).send(error);
});


app.listen(port, () => {
    console.log(`Started up at port ${port}`);
});
  
module.exports = {app};