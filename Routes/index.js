function loadRoutes(name, app) {
  require(name)(app);
}

module.exports = app => {
  require('./users')(app);
  require('./chat')(app);
}
