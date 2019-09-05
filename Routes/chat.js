const {SendMessageController} = require(global.rootPath+'/Controllers');
const Auth = require(global.rootPath+'/Lib/Auth');

module.exports = (app) => {

// Send chat message
app.post('/message/send',
  [Auth.authRequiredMiddleware].concat(SendMessageController.requestValidation()),
  SendMessageController.sendMessage,
  (error) => { res.status(400).send(error) }
);

}
