const jwt = require('jsonwebtoken');

class Auth {

  static verifyToken(token, userData = false) {
    return new Promise(resolve => {
      jwt.verify(token, process.env.JWT_PRIVATE_KEY, (err, decoded) => {

        if (err){
          return reject(err);
        }

        return resolve(userData ? decoded : {success:true});
      });
    });
  }

  static getUserMiddleware(req, res, next) {
    let token = req.headers['x-access-token'] || req.headers['authorization'];

    if (token) {

      token = token.startsWith('Bearer ')
        ? token.slice(7, token.length)
        : token;

      jwt.verify(token, process.env.JWT_PRIVATE_KEY, (err, decoded) => {
          !err ? req.user = decoded : null;
          next();
      });
    } else {
      next();
    }

  }
}

module.exports = Auth
