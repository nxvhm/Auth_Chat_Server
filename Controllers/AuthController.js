const User = require('./../models/user');

module.exports = {
  // Signup Account
  signup: function(request, response) {
    let user = new User(request.body);
    let result = {};
    
    user.save().then( user=> {
      result = {success: 1, error: 0, msg: 'User created'};
      response.send(result);
    }, err => {
      result = {success: 0, error: 1, msg: err}
      response.send(result);
    });
  },
  
  // Login Account to Application
  login: function(request, response) {
    let params = req.body;
    let user = new User(params);
    return user;
  }
};