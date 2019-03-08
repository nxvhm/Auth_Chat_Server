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

mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true});
console.log(process.env.MONGODB_URI);

var app = express();
const port = process.env.PORT ? Number(process.env.PORT) : 4000;

app.use(bodyParser.json());
app.use(express.static('public'));

require('./Routes/users')(app);


app.listen(port, () => {
    console.log(`Started up at port ${port}`);
});

module.exports = {app};
