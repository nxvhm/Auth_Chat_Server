const Message = require(global.rootPath+'/Models/Message');
const Conversation = require(global.rootPath+'/Models/Conversation');
const mongoose = require('mongoose');
const { body, validationResult  } = require('express-validator');

module.exports = {
  getPrivateMessagesValidation: () => {
    return [
      body('sender_id').not().isEmpty().custom(val => {
        return mongoose.Types.ObjectId.isValid(val);
      }),
      body('receiver_id').not().isEmpty().custom(val => {
        return mongoose.Types.ObjectId.isValid(val);
      }),
    ]
  },

  getPrivateMessages: (req, res) => {
    const errors = validationResult(req);

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

    Conversation.findChat(chatData)
    .then(chat => {
      return Message.find()
        .where('conversation_id.').equals(chat._id)
        .sort(['created_at', -1])
        .limit(10)
    })
    .then(messages => {
      return res.send(messages);
    })
    .catch(error => {
      return res.status(400).send({
        message: error.message
      });
    });
  }
}
