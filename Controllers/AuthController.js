const User = require('./../models/user');
const bcrypt = require('bcryptjs');
const validator = require('validator');
const Auth = require(global.rootPath+'/Lib/Auth');
const jwt = require('jsonwebtoken');


module.exports = {

    // Signup Account
    signup: async function (request, response, next) {

        let user = new User(request.body);

        // Validate input
        let errors = user.validateSync();
        if (errors) {
            return response.send(errors);
        }

        // Check if user email exists
        let exists = await User.findOne({email: user.email});

        if (exists) {
            return response.send({errors: {email: {message: 'Email already exists'}}});
        }

        user.password = bcrypt.hashSync(request.body.password, parseInt(process.env.BCRYPT_AUTH_ROUNDS));

        let result = user.save(err => {
            if (err) {
                response.send(err)
            } else {
                response.send({
                    'success': 1,
                    'msg': 'User created',
                });
            }
        });
    },

    // Login Account to Application
    login: async function (request, response) {
        let params = request.body;

        let result = {msg: ''};

        // Validate params
        if (!params.email || !validator.isEmail(params.email)) {
            result.error = 1;
            result.msg = `${params.email} is not a valid email`;
            return response.send(result);
        }

        if (!params.password || params.password.length < 6) {
            result.error = 1;
            result.msg = 'Password should be at least 6 characters long';
            return response.send(result);
        }

        // Fetch user by email
        let user = await User.findOne({email: params.email})
          .select('+password')
          .exec();

        if (!user) {
            result.error = 1;
            result.msg = 'Email/Password does not match';
            return response.send(result);
        }
        if (bcrypt.compareSync(params.password, user.password)) {
            const token = user.generateAuthToken();
            response.header('x-auth-token', token);
            response.send({token});
        } else {
            result.error = 1;
            result.msg = 'Email/Password does not match';
            return response.send(result);
        }
    },

    verify: function(request, response) {
      let token = request.query.token ? request.query.token : false;
      let userData = request.query.userData ? true: false;

      if (!token) {
        return response.send({'success': false});
      }
      Auth.verifyToken(token, userData).then(data => {
        return response.send(data);
      }).catch(err => {
        return response.send({success:false});
      });
    }
};
