const mongoose = require('mongoose');
const schema = require('./Schemas/conversation');

let model = mongoose.model('Conversation', schema);

model.createNew = (data) => {
  return new Promise((resolve, reject) => {
    let conversation = model(data);
    conversation.save((err,res) => {
      if (err) reject(err);
      resolve(res);
    })

  });
};

module.exports = model;
