const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({

  title: {
    type: String,
    required: true,
  },





  category: {
    type: String,
    required: true,
  },





  image: {
    type: String,
    required: true,
  },





  desc: {
    type: String,
    required: true,
  },





  author: {
    type: String,
    required: true,
  },





  date: {
    type: String,
    required: true,
  },





  readTime: {
    type: String,
    required: true,
  },



  commentsCount: {
  type: Number,
  default: 0,
},

  content: {
    type: String,
    required: true,
  },

}, {

  timestamps: true,

});

const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;