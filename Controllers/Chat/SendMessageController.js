const { body, check, validationResult  } = require('express-validator');
const Message = require(global.rootPath+'/Models/Message');
const Conversation = require(global.rootPath+'/Models/Conversation');
var mongoose = require('mongoose');

module.exports = {

  requestValidation: () => {
    return [
      body('sender_id').not().isEmpty().custom(val => {
        return mongoose.Types.ObjectId.isValid(val);
      }),
      body('receiver_id').not().isEmpty().custom(val => {
        return mongoose.Types.ObjectId.isValid(val);
      }),
      check('msg').isLength({min: 1})
    ]
  },

  sendMessage: (req, res) => {
    const errors = validationResult(req);

    let responseBody = {success: true, error: false};

    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    let chatData = {
      members: [
        mongoose.Types.ObjectId(req.body.sender_id),
        mongoose.Types.ObjectId(req.body.receiver_id)
      ],
      conversation_type: 'private'
    };

    let msgData = req.body;
    Conversation.findOne()
      .where('conversation_type').equals(chatData.conversation_type)
      .where('members').all(chatData.members)
      .then((chat) => {

        return !chat
          ? Conversation.createNew(chatData)
          : Promise.resolve(chat);

      }).then(chat => {
        return Message.createNew(msgData, chat._id);
      }).then(message => {
        responseBody.message = message;
        res.send(responseBody);
      }).catch(error => {
        responseBody.error = 1;
        responseBody.success = false;
        responseBody.message = error.message;
        console.log("ERROR IN SEND MESSAGE ACTION", error);
        res.send(responseBody);
      });
  },

}
