const express = require("express");
const router = express.Router();
const {} = require("../controllers/article");
router.get("/"
// , getArticlesController 
)
router.get("/:id"
// , getOneArticleController 
)
router.post("/"
// , articleValidator, validatorResult, createNewArticleController 
)
router.put("/:id"
// , editArticleController
)
router.delete("/:id"
// , deleteArticleController
)


module.exports = router;