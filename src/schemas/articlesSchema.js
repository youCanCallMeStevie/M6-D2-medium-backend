const mongoose = require("mongoose")
const { Schema } = require("mongoose")

const ArticleSchema = new Schema({
  headLine: { type: String, required: true },
  subHead: { type: String, required: true },
  content: { type: String, required: true },
  category: { type: String, required: true },
  author: { type: Object, default: {name: "John Doe", img: "https://ui-avatars.com/api/?name=John+Doe"} },
  cover: { type: String, required: true },
  reviews: [{ text: { type: String }, user: { type: String } }],

},   { timestamps: true });


module.exports = mongoose.model("Article", ArticleSchema)
