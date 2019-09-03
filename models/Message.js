const mongoose = require('mongoose');

const messageSchema = require('./Schemas/message');

let model = mongoose.model('Message', messageSchema);

model.createNew = (data, conversationId) => {
  return new Promise((resolve, reject) => {

    let msgModel = new model();
    msgModel.body = data.msg;
    msgModel.receiver_id = data.receiver_id;
    msgModel.sender_id = data.sender_id;
    msgModel.conversationId = conversationId;

    msgModel.save((err, res) => {
      if (err) reject(err);
      resolve(res);
    });

  });
};

module.exports = model;
