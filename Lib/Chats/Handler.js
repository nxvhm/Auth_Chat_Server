var mongoose = require('mongoose');

class Handler {

  static getChatPairId(uid1, uid2) {
    if (!uid1 || !uid2) {
      return null;
    }
    uid1 = mongoose.Types.ObjectId(uid1);
    uid2 = mongoose.Types.ObjectId(uid2);

    return uid1.getTimestamp() > uid2.getTimestamp()
      ? uid1.toString() + uid2.toString()
      : uid2.toString() + uid1.toString();
  }

}

module.exports = Handler
