const mongoose = require("mongoose");
const { Schema, model } = require("mongoose");


const ArticleSchema = new Schema({
  headLine: { type: String, required: true },
  subHead: { type: String, required: true },
  content: { type: String, required: true },
  category: { type: String, required: true },
  cover: { type: String, required: true },
  reviews: [{ text: { type: String }, user: { type: String } }],
  author: [{ type: Schema.Types.ObjectId, ref: "Author" }],
  claps: [{ type: Schema.Types.ObjectId, ref: "User" }],


},   { timestamps: true });

ArticleSchema.static("findArticleWithAuthor", async function (id) {
  const book = await ArticleModel.findById(id).populate("author")
  return book
})


const ArticleModel = model("Article", ArticleSchema)
module.exports = ArticleModel
