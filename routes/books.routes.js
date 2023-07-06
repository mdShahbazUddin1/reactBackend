const express = require("express");
const { BookModel } = require("../model/books.model");


const bookRouter = express.Router();

bookRouter.post("/add",async(req,res)=>{
    try {
        const {title,author,image,genre,description,price} = req.body
        const newBook = new BookModel({title,author,image,genre,description,price})
        const addBook = await newBook.save()
        res.status(200).send({msg:"Book Added",addBook})
    } catch (error) {
        res.status(400).send({msg:"something went wrong"});
    }
})


bookRouter.get("/getbook",async(req,res)=>{
    try {
        const book = await BookModel.find()
        res.status(200).send({msg:"All Book Retrive",book})
    } catch (error) {
        res.status(400).send({msg:"something went wrong"});
    }
})


bookRouter.delete("/deletebook/:id",async(req,res)=>{
    try {
        const {id} = req.params
         await BookModel.findByIdAndDelete(id)
        res.status(200).send({msg:"Book Deleted"})
    } catch (error) {
        res.status(400).send({msg:"something went wrong"});
    }
})

bookRouter.get("/genre/:genre", async (req, res) => {
  try {
    const { genre } = req.params;
    const book = await BookModel.find({genre});
    res.status(200).send({ msg: "Filtered Book",book});
  } catch (error) {
    res.status(400).send({ msg: "something went wrong" });
  }
});

bookRouter.get("/sort/:books", async (req, res) => {
  try {
    const { books } = req.params;
    const sortBook = books === 'asc' ? 1 : -1
    const book = await BookModel.find().sort({price:sortBook});
    res.status(200).send({ msg: "sorted Book", book });
  } catch (error) {
    res.status(400).send({ msg: "something went wrong" });
  }
});


module.exports = {bookRouter}