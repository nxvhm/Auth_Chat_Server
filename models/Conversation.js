const mongoose = require('mongoose');
const schema = require('./Schemas/conversation');

let model = mongoose.model('Conversation', schema);

model.TYPE_CHAT = 'private';
model.TYPE_CHATROOM = 'chatroom'

model.createNew = (data) => {
  return new Promise((resolve, reject) => {
    let conversation = model(data);
    conversation.save((err,res) => {
      if (err) reject(err);
      resolve(res);
    })

  });
};

model.findChat = (data) => {

  model.findOne()
    .where('conversation_type').equals(data.conversation_type)
    .where('members').all(data.members)
    .then(conversation => {
      return !conversation
        ? model.createNew(data)
        : Promise.resolve(chat);
    }).catch(err => {
      return Promise.reject(err);
    });
}

module.exports = model;
