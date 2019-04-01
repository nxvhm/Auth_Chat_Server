if (process.env.NODE_ENV !== 'production') {
  // Configure with .env file for every env diff. then prod.
  require('dotenv').config();
} else {
  // Use config file
  require('./config/config');
}

console.log('SERVER ENV:',process.env.NODE_ENV);
console.log('MONGODB URI:', process.env.MONGODB_URI);

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const ChattyWSS = require('./Socket/Server');

mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true});

const app = express();
const port = process.env.PORT ? Number(process.env.PORT) : 4000;

app.use(bodyParser.json());
app.use(express.static('public'));

require('./Routes/users')(app);

const http = require('http').createServer();
// Pass all http requests to our express setup
http.on('request', app);

ChattyWSS.start(http);

http.listen(port, () => {
  console.log(`HTTP/WS SERVERS LISTENING ON PORT ${port}`);
})

module.exports = {app};
