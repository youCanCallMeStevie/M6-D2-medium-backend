const express = require("express");
const router = express.Router();
const {
  getArticlesController,
  getOneArticleController,
  createNewArticleController,
  editArticleController,
  deleteArticleController,
} = require("../controllers/article");
router.get("/", getArticlesController);
router.get("/:id", getOneArticleController);
router.post("/", createNewArticleController);
router.put("/:id", editArticleController);
router.delete("/:id", deleteArticleController);

module.exports = router;
