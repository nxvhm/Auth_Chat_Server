const { body, check, validationResult  } = require('express-validator');
const ChatHandler = require(global.rootPath+'/Lib/Chats/Handler');
const Conversation = require(global.rootPath+'/Models/Schemas/conversation');
var mongoose = require('mongoose');
const ChatServer = require(global.rootPath+'/Socket/server');
module.exports = {

  sendMessageValidation: () => {
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

    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    // Validate Contents,
    // Save Message To DB,
    // etc

    console.log(req.body);

    res.send({success:true});
  },

}
