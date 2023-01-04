// create an instance of express routers
const express = require("express");
const db = require("../models");
const router = express.Router();
const axios = require("axios");

// //GET localhost:8000/comments/:id
// router.get("/:id", async (req, res) => {
//   // res.send('comments page')
//   try {
//     const comments = await db.comment.findAll();
//     const favorites = await db.cocktail.findOne();
//     res.render("/cocktails/favorites.ejs");
//   } catch (error) {
//     console.log(error.message);
//   }
// });

// router.post("/:id", async (req, res) => {
//   try {
//     await db.comment.findOrCreate();
//   } catch (error) {
//     console.log(error.message);
//   }
// });

module.exports = router;
