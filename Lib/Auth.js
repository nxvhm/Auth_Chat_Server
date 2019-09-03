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
  /**
   * Attach Decoded JWT contents to request object as 'user'
   * If valid jwt provided and can be decoded
   * @param   {Object}  req   Express Request
   * @param   {Object}  res   Express Response
   * @param   {Callback}  next  Express next callback
   *
   * @return  {void}
   */
  static getUserMiddleware(req, res, next) {
    let token = req.headers['x-access-token'] || req.headers['authorization'];

    if (!token) return next();

    token = token.startsWith('Bearer ')
      ? token.slice(7, token.length)
      : token;

    Auth.verifyToken(token, true).then(result => {
      req.user = result;
      return next();
    }).catch(err => {
      return next();
    });
  }

  /**
   * If valid JWT token provided as header continue with request,
   * else terminate request and send 403 response
   * @param   {Object}  req   Express Request
   * @param   {Object}  res   Express Response
   * @param   {Callback}  next  Express next callback
   *
   * @return  {void}
   */
  static authRequiredMiddleware(req, res, next) {
    let token = req.headers['x-access-token'] || req.headers['authorization'];

    if (!token) return res.sendStatus(403);

    if (token.startsWith('Bearer '))
      token = token.slice(7, token.length);

    if (!token) return res.sendStatus(403);

    Auth.verifyToken(token, true).then(userData => {
      req.user = userData;
      return next();
    }).catch(err => {
      return res.sendStatus(403);
    })

  }
}

module.exports = Auth
