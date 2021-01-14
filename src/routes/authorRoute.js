const express = require("express");

const router = express.Router();
const {
  getAuthorsController,
  getOneAuthorController,
  postAuthorController,
  editAuthorController,
  deleteAuthorController,
} = require("../controllers/authors");

router.get("/", getAuthorsController);
router.get("/:id", getOneAuthorController);
router.post("/", postAuthorController);
router.put("/:id", editAuthorController);
router.delete("/:id", deleteAuthorController);

module.exports = router;
