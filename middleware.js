if (process.env.NODE_ENV !== 'production') {
  // Configure with .env file for every env diff. then prod.
  require('dotenv').config();
} else {
  // Use config file
  require('./config/config');
}

const jwt = require('jsonwebtoken');

module.exports = {

  authRequired: (req, res, next) => {
    let token = req.headers['x-access-token'] || req.headers['authorization'];
    if (token.startsWith('Bearer '))
      token = token.slice(7, token.length);

    if (token) {
      jwt.verify(token, process.env.JWT_PRIVATE_KEY, (err, decoded) => {
        if (err) {
          return res.send(403, 'Forbidden');
        } else {
          req.user = decoded;
          next();
        }
      });
    } else {
      return res.json({
        success: false,
        message: 'Auth token is not supplied'
      });
    }
  }
}
