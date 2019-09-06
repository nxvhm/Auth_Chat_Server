const mongoose = require('mongoose');

module.exports = mongoose.Schema({
  body: {
    type: String,
    required: true,
  },
  conversation_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Conversation'
  },
  receiver_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  sender_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },

}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at'}});
