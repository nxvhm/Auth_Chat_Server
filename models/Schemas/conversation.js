const mongoose = require('mongoose');

const conversation = mongoose.Schema({

  members: [{
    type: mongoose.Schema.Types.ObjectId, ref: 'User'
  }],
  name: {
    type: String,
    required: false,
    default: ""
  },
  description: {
    type: String,
    required: false,
    default: "",
  },
  author: {
    type:  mongoose.Schema.Types.ObjectId, ref: 'User',
    required: false,
  },
  conversation_type: {
    type: String,
    required: true,
    enum : ['private','chatroom'],
    default: 'private',
  },

}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at'}});

module.exports = conversation
