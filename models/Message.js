const mongoose = require('mongoose');

const messageSchema = require('./Schemas/message');

let model = mongoose.model('Message', messageSchema);

model.createNew = (data, conversation_id) => {
  return new Promise((resolve, reject) => {

    let msgModel = new model();
    msgModel.body = data.msg;
    msgModel.receiver_id = data.receiver_id;
    msgModel.sender_id = data.sender_id;
    msgModel.conversation_id = conversation_id;

    msgModel.save((err, res) => {
      if (err) reject(err);
      resolve(res);
    });

  });
};

module.exports = model;
