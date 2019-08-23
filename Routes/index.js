module.exports = app => {
  require('./users')(app);
  require('./chat')(app);
}
