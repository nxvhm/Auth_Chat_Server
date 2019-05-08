const fs = require('fs');
const mongoose = require('mongoose');
const User = require('../models/user');
const ChatWSS = require('../Socket/Server');
const MongoId = mongoose.Types.ObjectId;
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
      return res.send(401);
    }

    let userData = await User.findOneAndUpdate({
      _id: new mongoose.Types.ObjectId(userId)
    }, {avatar}, {new: true}).exec();

    let updatedUser = new User(userData);

    return res.send({token: updatedUser.generateAuthToken()});
  },
  /**
   * Get users currently connected to the WebSocker server
   */
  getUsersOnline: async (req, res) => {
    if (ChatWSS.wss !== null) {

      let userIds = ChatWSS.getConnectedUserIds();

      if (!userIds) {
        return res.send({});
      }

      let users = await User.find({'_id': {'$in': userIds}}, {tokens: 0}).exec();

      let result = [];

      users.forEach( (user, index) => {

        result.push({
          username: user.username,
          avatar: user.getAvatarUrl(),
          email: user.email,
          _id: user._id
        });

      });

      return res.send(result);

    } else {
      return res.send(JSON.stringify({'msg':'NO WebSocketServer runing', error: 1}))
    }
  },

  getUserData: async (req, res) => {
    let {userId} = req.params;

    if(!userId || !MongoId.isValid(userId)) {
      res.send(404);
    }

    let user = await User.findById(userId);
    let userData = user.toObject();
    userData.avatarUrl = user.getAvatarUrl();

    res.send(userData);
  }
}
