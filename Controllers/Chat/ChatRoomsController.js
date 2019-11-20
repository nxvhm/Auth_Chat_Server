const Conversation = require(global.rootPath+'/Models/Conversation');

module.exports = {
  getRooms: (req, res) => {

    let limit = 10;

    let query = Conversation.find()
      .where('conversation_type')
      .equals(Conversation.TYPE_CHATROOM)
      .sort('createdAt')
      .limit(limit);

    if (req.body.createrAt) {
      query.where('createdAt').gt(req.body.createdAt);
    }

    query.then((chatRooms) => {
      return res.send(chatRooms);
    }).catch(err => {
      return res.status(400).json(err.message);
    });
  }
}
