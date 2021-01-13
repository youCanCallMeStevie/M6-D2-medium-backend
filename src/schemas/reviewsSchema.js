const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const ReviewsSchema = new Schema(
  {
    text: { type: String, required: true },
    user: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Review", ReviewsSchema);
