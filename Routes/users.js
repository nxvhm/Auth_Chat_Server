const {AuthController, UserController} = require('./../Controllers');
const Auth = require(global.rootPath+'/Lib/Auth');

module.exports = app => {
  // Login attempts
  app.post('/login', AuthController.login, (error) => {
    res.status(400).send(error);
  });

  // Signup requests
  app.post('/signup', AuthController.signup, (error) => {
    res.status(400).send(error);
  });

  app.get('/verify-token', AuthController.verify, (error) => {
    res.status(400).send(error);
  });

  // Get list of available avatars
  app.get('/avatars', UserController.getListOfAvatars, err => {
    res.status(400).send(err);
  });

  app.post('/user/save-avatar', Auth.authRequiredMiddleware, UserController.saveAvatar, err => {
    res.status(400).send(err);
  });

  app.get('/user/:userId', Auth.authRequiredMiddleware, UserController.getUserData, err => {
    res.status(400).send(err);
  });

  app.get('/users/online', Auth.authRequiredMiddleware, UserController.getUsersOnline, err => {
    res.status(400).send(err);
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
