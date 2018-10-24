require('./../config/config');
const User = require('./../models/user');
const bcrypt = require('bcryptjs');

module.exports = {

  // Signup Account
  signup: async function(request, response, next) {
    
    let user = new User(request.body);

    // Validate input
    let errors = user.validateSync();
    if (errors) {
      return response.send(errors);
    }

    // Check if user email exists
    let exists = await User.findOne({email: user.email});
    
    if (exists) {
      return response.status(200).send({errors: {email: {message: 'Email already exists'}} });
    }

    user.password =  bcrypt.hashSync(request.body.password, parseInt(process.env.BCRYPT_AUTH_ROUNDS));

    let result = user.save(err => {
      if (err) { 
        response.send(err) 
      } else {
        response.send({'success': 1, 'msg': 'User created'});
      }
    });
  },

  // Login Account to Application
  login: function(request, response) {
    let params = request.body;
    let user = new User(params);
    return user;
  }
};