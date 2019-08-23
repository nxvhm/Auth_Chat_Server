const { body, check, validationResult  } = require('express-validator');
const ChatHandler = require('./../../Lib/Chats/Handler');

var mongoose = require('mongoose');

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

    let data = req.body;
    console.log(ChatHandler.getChatPairId(data.sender_id, data.receiver_id));
    console.log(req.body);
  },

}
