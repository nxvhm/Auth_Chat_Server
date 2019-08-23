const {ChatController} = require('./../Controllers');

module.exports = (app) => {
// Send chat message
app.post('/message/send',
  ChatController.sendMessageValidation(),
  ChatController.sendMessage,
  (error) => {
    res.status(400).send(error);
  });
}
