const mongoose = require("mongoose")
const { Schema } = require("mongoose")

const ArticleSchema = new Schema({
  headLine:  String,
  subHead: String,
  content:   String,
  category:   String,
  author: { type: Object, default: {name: "John Doe", img: "https://ui-avatars.com/api/?name=John+Doe"} },
  cover: String,
},   { timestamps: true });


module.exports = mongoose.model("Article", ArticleSchema)
