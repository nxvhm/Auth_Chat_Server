const fs = require('fs');

module.exports = {
  /**
   * Get list of available avatars in the system
   * @return  {json}
   */
  getListOfAvatars: (req, res) => {
    let avatarsFolder = './public/avatars';
    let avatars = [];

    fs.readdirSync(avatarsFolder).forEach(file => {
      let avatarUrl = req.protocol + '://' + req.get('host') + req.originalUrl + file;
      avatars.push(avatarUrl);
    });

    return res.send(avatars);
  }
}
