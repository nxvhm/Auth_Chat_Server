const AuthController = require('./AuthController');
const UserController = require('./UserController');
const SendMessageController = require('./Chat/SendMessageController');
const GetMessagesController = require('./Chat/GetMessagesController');

module.exports = {
  AuthController,
  UserController,
  SendMessageController,
  GetMessagesController
}
