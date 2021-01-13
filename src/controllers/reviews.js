const express = require("express");

const ReviewsSchema = require("../schemas/reviewsSchema"); //importing the model, the wrapper of the schema
const ArticleSchema = require("../schemas/articlesSchema"); //importing the model, the wrapper of the schema

exports.getReviewsController = async (req, res, next) => {
  try {
    const { reviews } = await ReviewsSchema.findById(req.params.id, {
      reviews: 1,
      _id: 0,
    });
    res.send(reviews);
  } catch (error) {
    console.log("getReviewsController error: ", error);
    res.status(500).json({ success: false, errors: "Internal Server Error" });
  }
};

exports.getOneReviewController = async (req, res, next) => {
  try {
    const { reviews } = await ReviewsSchema.findOne(
      {
        _id: mongoose.Types.ObjectId(req.params.id),
      },
      {
        _id: 0,
        reviews: {
          $elemMatch: { _id: mongoose.Types.ObjectId(req.params.reviewsId) },
        },
      }
    );

    if (reviews && reviews.length > 0) {
      res.send(reviews[0]);
    } else {
      const error = new Error(
        `Review with id ${mongoose.Types.ObjectId(
          req.params.reviewsId
        )} not found`
      );
      res.status(404).json({ success: false, errors: error });
      next(error);
    }
  } catch (error) {
    console.log("getOneReviewController error: ", error);
    res.status(500).json({ success: false, errors: "Internal Server Error" });
  }
};

exports.postReviewController = async (req, res, next) => {
  try {
    const articleId = req.body.id;
    const articleReviewed = await ArticleSchema.findById(articleId, { _id: 0 });
    const reviewToInsert = { ...articleReviewed, date: new Date() };
    const updated = await ReviewsSchema.findByIdAndUpdate(
      req.params.id,
      {
        $push: {
          reviews: reviewToInsert,
        },
      },
      { runValidators: true, new: true }
    );
    res.status(201).json({ success: true, reviewAdded: updated });
  } catch (error) {
    console.log("postReviewController: ", error);
    res.status(500).json({ success: false, errors: "Internal Server Error" });
    next(error);
  }
};

exports.editReviewController = async (req, res, next) => {
  try {
    const { reviews } = await ReviewsSchema.findOne(
      {
        _id: mongoose.Types.ObjectId(req.params.id),
      },
      {
        _id: 0,
        reviews: {
          $elemMatch: { _id: mongoose.Types.ObjectId(req.params.reviewId) },
        },
      }
    );
    if (reviews && reviews.length > 0) {
      const oldReview = reviews[0].toObject();
      const modifiedReview = { ...oldReview, ...req.body };
      await ReviewsSchema.findOneAndUpdate(
        {
          _id: mongoose.Types.ObjectId(req.params.id),
          "reviews._id": mongoose.Types.ObjectId(req.params.bookId),
        },
        { $set: { "reviews.$": modifiedReview } },
        {
          runValidators: true,
          new: true,
        }
      );
      res.status(201).json({ success: true, data: modifiedReview });
    } else {
      const error = new Error(`Review with id ${req.params.id} not found`);
      error.httpStatusCode = 404;
      next(error);
    }
  } catch (error) {
    console.log("editReviewController: ", error);
    res.status(500).json({ success: false, errors: "Internal Server Error" });
    next(error);
  }
};

exports.deleteReviewController = async (req, res, next) => {
  try {
    const modifiedArticle = await ReviewsSchema.findByIdAndUpdate(
      req.params.id,
      {
        $pull: {
          reviews: { _id: mongoose.Types.ObjectId(req.params.reviewId) },
        },
      },
      {
        runValidators: true,
        new: true,
      }
    );
    if (modifiedArticle) {
      res.status(201).json({ success: true, data: "Review deleted" });
    } else {
      const error = new Error(`Review with id ${id} not found`);
      res.status(404).json({ success: false, errors: error });
      next(error);
    }
  } catch (error) {
    console.log("deleteReviewController: ", error);
    res.status(500).json({ success: false, errors: "Internal Server Error" });
    next(error);
  }
};