const mongoose = require("mongoose")
const { Schema } = require("mongoose")

const ArticleSchema = new Schema({
  headLine:  String,
  subHead: String,
  content:   String,
  category:   String,
  author: [{ name: String, img: String }],
  cover: String,
});


module.exports = mongoose.model("Article", ArticleSchema)
