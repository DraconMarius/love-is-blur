const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');
// message schema on the same page
// const { message } = require('./Message');

const chatSchema = new Schema({
  messages: [
    {
      messageText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280,
      },
      messageAuthor: {
        type: String,
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => dateFormat(timestamp),
      },
    },
  ],
});

const Chat = model('Chat', chatSchema);

module.exports = Chat;
