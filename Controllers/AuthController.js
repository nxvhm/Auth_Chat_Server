const User = require('./../models/user');

module.exports = {

  // Signup Account
  signup: function(request, response) {
    
    request.body.password = "";
    let user = new User(request.body);

    let errors = user.validateSync();

    if (errors) {
      return response.send(errors);
    }
    
    let result = user.save();

    response.send(result);
  },

  // Login Account to Application
  login: function(request, response) {
    let params = req.body;
    let user = new User(params);
    return user;
  }
};