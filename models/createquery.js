const mongoose = require("mongoose");

const queryData = new mongoose.Schema({
  category: {
    type: String,
    required: true
  },
  subcategory: {
    type: String,
    required: true
  },
  tag: {
    type: String,
    required: true
  },

  language: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  from: {
    type: String,
    required: true
  },
  till: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  mentoremail: {
    type: String,
    required: false
  },
  dateandtime: {
    type: String,
    required: true
  }
});
//userdetail is the modelname.using these userdetail we can able to create,read,update,delete datas in userdetails collection
const querydata = mongoose.model("queries", queryData);

module.exports = querydata;
