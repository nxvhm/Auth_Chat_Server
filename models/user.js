const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');

const userSchema = mongoose.Schema({
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
            validator: (v) => validator.isLength(v, {min: 6, max: 64}),
            message: 'Password min/max length is 8/64'
        }
    },
    username: {
        type: String,
        required: true,
        minlength: 4
    },
    gender: {
        type: Number,
        required: true,
        default: 1
    },
    avatar: {
      type: String,
      default: ""
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

userSchema.methods.generateAuthToken = function () {
  return jwt.sign({
    _id: this._id,
    username: this.username,
    email: this.email,
    avatar: this.avatar ? this.getAvatarUrl() : ''
  }, process.env.JWT_PRIVATE_KEY, {expiresIn: '1h'});
};

userSchema.methods.getAvatarUrl = function() {
  return process.env.APP_URL + 'avatars/'+this.avatar;
};

module.exports = mongoose.model('User', userSchema);
