const {AuthController, UserController} = require('./../Controllers/Controllers');
const {authRequired} = require('./../middleware');
const ChattyWSS = require('../Socket/Server');

module.exports = app => {
  // Login attempts
  app.post('/login', AuthController.login, (error) => {
    res.status(400).send(error);
  });

  // Signup requests
  app.post('/signup', AuthController.signup, (error) => {
    res.status(400).send(error);
  });

  // Get list of available avatars
  app.get('/avatars', UserController.getListOfAvatars, err => {
    res.status(400).send(err);
  });

  app.post('/user/save-avatar', authRequired, UserController.saveAvatar, err => {
    res.status(400).send(err);
  });

  app.get('/users/online', (req, res) => {
    if (ChattyWSS.wss !== null) {
      res.send(ChattyWSS.getConnectedUserIds());
    } else {
      res.send(JSON.stringify({'msg':'NO WebSocketServer runing', error: 1}))
    }
  });

  // temporal use for mockups
  app.get('/users/active', (req, res) => {

    let userList = [
        {name: 'Rachel', 'avatar': '/images/avatar/small/rachel.png'},
        {name: 'Lindsay', 'avatar': '/images/avatar/small/lindsay.png'},
        {name: 'Matthew', 'avatar': '/images/avatar/small/matthew.png'},
        {name: 'Jenny Hess', 'avatar': '/images/avatar/small/jenny.jpg'},
        {name: 'Veronika Ossi', 'avatar': '/images/avatar/small/veronika.jpg'},
        {name: 'Rachel', 'avatar': '/images/avatar/small/rachel.png'},
        {name: 'Lindsay', 'avatar': '/images/avatar/small/lindsay.png'},
        {name: 'Matthew', 'avatar': '/images/avatar/small/matthew.png'},
        {name: 'Jenny Hess', 'avatar': '/images/avatar/small/jenny.jpg'},
        {name: 'Veronika Ossi', 'avatar': '/images/avatar/small/veronika.jpg'},
        {name: 'Rachel', 'avatar': '/images/avatar/small/rachel.png'},
        {name: 'Lindsay', 'avatar': '/images/avatar/small/lindsay.png'},
        {name: 'Matthew', 'avatar': '/images/avatar/small/matthew.png'},
        {name: 'Jenny Hess', 'avatar': '/images/avatar/small/jenny.jpg'},
        {name: 'Veronika Ossi', 'avatar': '/images/avatar/small/veronika.jpg'},
        {name: 'Rachel', 'avatar': '/images/avatar/small/rachel.png'},
        {name: 'Lindsay', 'avatar': '/images/avatar/small/lindsay.png'},
        {name: 'Matthew2', 'avatar': '/images/avatar/small/matthew.png'},
        {name: 'Jenny Hess2', 'avatar': '/images/avatar/small/jenny.jpg'},
        {name: 'Veronika Ossi2', 'avatar': '/images/avatar/small/veronika.jpg'}
      ];

      res.send(userList)
  }, err => {
    res.status(400).send(err);
  });

}
