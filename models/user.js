const mongoose = require('mongoose');
const validator = require('validator');

var User = mongoose.model('User', {
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    minlength: 1,
    validate: {
      validator: validator.isEmail,
      message: '{VALUE} is not a valid email'
    }
  },
  password: {
    type: String,
    validate: {
      validator: (v) => validator.isLength(v, {min:6,max:20}),
      message: 'Password min/max length is 6/20'
    }    
  },  
  username: {
    type: String,
    required: true,
    minlength: 6
  },
  gender: {
    type: Number,
    required: true,
    default: 1
  },
  tokens: [{
    access: {
      type: String,
      required: true
    },
    token: {
      type: String,
      required: true
    },
  }],
});

module.exports = User

// email	admin@admin.com
// gender	2
// password	123456
// username	toonito