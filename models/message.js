const mongoose = require("mongoose");

const messageData = new mongoose.Schema({
  sender_id: {
    type: String,
    required: true
  },
  receiver_id: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },

  messagekey: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  dateandtime: {
    type: String,
    required: true
  }
});
//userdetail is the modelname.using these userdetail we can able to create,read,update,delete datas in userdetails collection
const messages = mongoose.model("messages", messageData);

module.exports = messages;
