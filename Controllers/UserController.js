const fs = require('fs');
const mongoose = require('mongoose');
const User = require('../models/user');

module.exports = {
  /**
   * Get list of available avatars in the system
   * @return  {json}
   */
  getListOfAvatars: (req, res) => {
    let avatarsFolder = './public/avatars';
    let avatars = [];

    fs.readdirSync(avatarsFolder).forEach(file => {
      let avatarUrl = req.protocol + '://' + req.get('host') + req.originalUrl + file;
      avatars.push(avatarUrl);
    });

    return res.send(avatars);
  },

  saveAvatar: async (req, res) => {
    let {userId, avatar} = req.body;

    avatar = avatar.split('/');
    avatar = avatar[avatar.length - 1];

    if (req.user._id !== userId) {
      res.send(401);
    }

    let userData = await User.findOneAndUpdate({
      _id: new mongoose.Types.ObjectId(userId)
    }, {avatar}, {new: true}).exec();

    let updatedUser = new User(userData);

    res.send({token: updatedUser.generateAuthToken()});
  }
}
