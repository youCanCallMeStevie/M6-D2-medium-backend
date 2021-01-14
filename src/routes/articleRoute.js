const express = require("express");

const router = express.Router();
const {
  getArticlesController,
  getOneArticleController,
  createNewArticleController,
  editArticleController,
  deleteArticleController,
} = require("../controllers/article");

const {
  getReviewsController,
  getOneReviewController,
  postReviewController,
  editReviewController,
  deleteReviewController,
} = require("../controllers/reviews");

router.get("/", getArticlesController);
router.get("/:id", getOneArticleController);
router.post("/", createNewArticleController);
router.put("/:id", editArticleController);
router.delete("/:id", deleteArticleController);
router.get("/:id/reviews", getReviewsController);


router.get("/:id/reviews/:reviewId", getOneReviewController);
router.post("/:id", postReviewController);
router.put("/:id/reviews/:reviewId", editReviewController);
router.delete("/:id/reviews/:reviewId", deleteReviewController);

module.exports = router;
