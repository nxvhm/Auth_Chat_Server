const {ChatController} = require('./../Controllers');
const Auth = require(global.rootPath+'/Lib/Auth');

module.exports = (app) => {

// Send chat message
app.post('/message/send',
  [Auth.authRequiredMiddleware].concat(ChatController.sendMessageValidation()),
  ChatController.sendMessage,
  (error) => { res.status(400).send(error) }
);

}
