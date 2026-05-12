const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(

  {

    blogId: {
      type: String,
      required: true,
    },

    userId: {
      type: String,
      required: true,
    },

    userName: {
      type: String,
      required: true,
    },

    text: {
      type: String,
      required: true,
    },

  },

  {
    timestamps: true,
  }

);

module.exports = mongoose.model(
  "Comment",
  commentSchema
);