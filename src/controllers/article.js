const express = require("express");
const ArticleSchema = require("../schemas/articlesSchema"); //importing the model, the wrapper of the schema

exports.getArticlesController = async (req, res, next) => {
  try {
    const articles = await ArticleSchema.find();
    res.send(articles);
  } catch (error) {
    console.log("getArticlesController error:", error);
    res.status(500).json({ success: false, errors: "Internal Server Error" });
  }
};

exports.getOneArticleController = async (req, res, next) => {
  try {
    const { id } = req.params.id;
    const foundArticle = await ArticleSchema(id);
    if (foundArticle) {
      res.status(200).json({ success: true, article: foundArticle });
    } else {
      const error = new Error(`Article with id ${id} not found`);
      res.status(404).json({ success: false, errors: error });
      next(error);
    }
  } catch (error) {
    console.log("getOneArticleController error:", error);
    res.status(500).json({ success: false, errors: "Internal Server Error" });
  }
};

exports.createNewArticleController = async (req, res, next) => {
  try {
    const newArticle = new ArticleSchema(req.body); //creating new instance, passing from the request body
    const { _id } = await newArticle.save(); //save needs to be async as it is returning a promise, save is similar to write. when we save the record in the db, the new document will be returned

    res.status(201).json({ success: true, _id: _id });
  } catch (error) {
    console.log("createNewArticleController:", error);
    res.status(500).json({ success: false, errors: "Internal Server Error" });
    next(error);
  }
};

exports.editArticleController = async (req, res, next) => {
  try {
    const article = await ArticleSchema.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        runValidators: true,
        new: true,
      }
    );
    if (article) {
      res.status(201).json({ success: true, data: article });
    } else {
      const error = new Error(`Article with id ${req.params.id} not found`);
      error.httpStatusCode = 404;
      next(error);
    }
  } catch (error) {
    console.log("editArticleController:", error);
    res.status(500).json({ success: false, errors: "Internal Server Error" });
    next(error);
  }
};

exports.deleteArticleController = async (req, res, next) => {
  try {
    const article = await ArticleSchema.findByIdAndDelete(req.params.id);
    if (article) {
      res.status(201).json({ success: true, data: "deleted" });
    } else {
      const error = new Error(`Article with id ${id} not found`);
      res.status(404).json({ success: false, errors: error });
      next(error);
    }
  } catch (error) {
    console.log("deleteArticleController:", error);
    res.status(500).json({ success: false, errors: "Internal Server Error" });
    next(error);
  }
};
