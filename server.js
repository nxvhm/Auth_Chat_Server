console.log('SERVER ENV:',process.env.NODE_ENV);

if (process.env.NODE_ENV !== 'production') {
    // Configure with .env file for every env diff. then prod.
    require('dotenv').config();
} else {
    // Use config file
    require('./config/config');
}

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const {AuthController, UserController} = require('./Controllers/Controllers');

mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true});
console.log(process.env.MONGODB_URI);

var app = express();
const port = process.env.PORT ? Number(process.env.PORT) : 4000;

app.use(bodyParser.json());
app.use(express.static('public'));

// Login attempts
app.post('/login', AuthController.login, (error) => {
    res.status(400).send(error);
});
// Signup requests
app.post('/signup', AuthController.signup, (error) => {
    res.status(400).send(error);
});
// Get list of available avatars
app.get('/avatars', UserController.getListOfAvatars, err => {
  res.status(400).send(err);
});
// temporal use for mockups
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
}, err => {
    res.status(400).send(err);
});


app.listen(port, () => {
    console.log(`Started up at port ${port}`);
});

module.exports = {app};
