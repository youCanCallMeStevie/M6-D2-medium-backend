const express = require("express");
const mongoose = require("mongoose");
const AuthorSchema = require("../schemas/authorsSchema"); //importing the model, the wrapper of the schema


exports.getAuthorsController =async (req, res, next)=>{
    try {
        const authors = await AuthorSchema.find(req.query)
        res.send(authors)
      } catch (error) {
        console.log("getAuthorsController error: ", error);
        res.status(500).json({ success: false, errors: "Internal Server Error" });
        next(error)
      }
}

exports.getOneAuthorController= async(req, res, next)=>{
    try {
        const id = req.params.id
        const author = await AuthorSchema.findById(id)
        if (author) {
            res.status(200).json({ success: true, author: author });
          } else {
            const error = new Error(`Author with id ${id} not found`);
            res.status(404).json({ success: false, errors: error });
            next(error);
          }
      } catch (error) {
        console.log("getOneAuthorController error: ", error);
        res.status(500).json({ success: false, errors: "Internal Server Error" });
        next(error)
      }
};

exports.postAuthorController = async(req,res, next)=>{
    try {
        const newAuthor = new AuthorSchema(req.body)
        const { _id } = await newAuthor.save()
        res.status(201).json({ success: true, _id: _id });
    } catch (error) {
        console.log("postAuthorController error: ", error);
        res.status(500).json({ success: false, errors: "Internal Server Error" });
        next(error)
      }

}

exports.editAuthorController = async (req, res, next)=>{
    try {
        const author = await AuthorSchema.findByIdAndUpdate(req.params.id, req.body)
        if (author) {
            res.status(201).json({ success: true, data: "edited" });
        } else {
          const error = new Error(`author with id ${req.params.id} not found`)
          error.httpStatusCode = 404
          next(error)
        }
    } catch (error) {
        console.log("editAuthorController error: ", error);
        res.status(500).json({ success: false, errors: "Internal Server Error" });
        next(error)
      }
};

exports.deleteAuthorController = async(req, res, next) => {
    try {
        const id = req.params.id
        const author = await AuthorSchema.findByIdAndDelete(id)
        if (author) {
            res.status(201).json({ success: true, data: "deleted" });
        } else {
          const error = new Error(`author with id ${id} not found`)
          error.httpStatusCode = 404
          next(error)
        }
    } catch (error) {
        console.log("deleteAuthorController error: ", error);
        res.status(500).json({ success: false, errors: "Internal Server Error" });
        next(error)
      }
}
