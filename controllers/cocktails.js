// create an instance of express routers
const express = require("express");
const db = require("../models");
const router = express.Router();
const axios = require("axios");

// GET localhost:8000/cocktails/search
router.get("/search", (req, res) => {
  res.render("cocktails/search.ejs", {
    user: res.locals.user,
  });
});

// GET localhost:8000/cocktails/search search for cocktails with keywords
router.post("/search", async (req, res) => {
  const search = req.body.search;
  // console.log(search);
  const url = `https://api.api-ninjas.com/v1/cocktail?name=${search}&$or=ingredient=${search}`;
  try {
    const response = await axios.get(url, {
      headers: {
        "x-api-key": process.env.API_KEY,
      },
    });
    let result = await response.data;
    result = result.map((item) => {
      // Split the name field into an array of words
      const words = item.name.split(" ");
      // Capitalize the first letter of each word
      const capitalizedWords = words.map((word) => {
        if (word.length > 0) {
          return word[0].toUpperCase() + word.slice(1);
        } else {
          return word;
        }
      });
      // Join the array of capitalized words into a single string
      item.name = capitalizedWords.join(" ");
      return item;
    });
    // Render the view with the modified result array
    res.render("cocktails/results.ejs", { results: result });
  } catch (error) {
    console.error(error);
  }
});

// GET localhost:8000/cocktails/favorites see all favorited cocktails
router.get("/favorites", async (req, res) => {
  try {
    const favorites = await db.cocktail.findAll();
    res.render("cocktails/favorites.ejs", { favorites });
  } catch (err) {
    console.log(err);
  }
});

router.get("/favorites", async (req, res) => {
  try {
    // Find the user by their id
    const user = await db.user.findByPk(res.locals.user.id);

    // Find all the cocktails that have been favorited by the user
    const favorites = await user.getFavorites();

    // Render a template or send a JSON response with the list of favorites
    res.render("cocktails/favorites.ejs", { favorites });
  } catch (err) {
    console.log(err);
  }
});
// POST localhost:8000/cocktails/favorites POST favorited cocktail by user into db
router.post("/favorites", async (req, res) => {
  try {
    const user = await db.user.findByPk(res.locals.user.id);
    const favorite = await db.cocktail.findOrCreate({
      where: {
        name: req.body.name,
        ingredients: req.body.ingredients,
        instructions: req.body.instructions,
      },
    });
    res.redirect(req.get("referer"));
  } catch (err) {
    console.log(err);
  }
});

//SECOND ATTEMPT START
// router.get("/favorites", async (req, res) => {
//   try {
//     await getFavorites(req, res);
//   } catch (err) {
//     console.log(err);
//     console.log("An error occurred while getting the list of favorites");
//   }
// });

// router.post("/favorites", async (req, res) => {
//   try {
//     await createFavorite(req.body, req, res);
//   } catch (err) {
//     console.log(err);
//     console.log("An error occurred while creating the new favorite");
//   }
// });

// async function getFavorites(req, res) {
//   const favorites = await db.cocktail.findAll({
//     where: {
//       name: req.body.name,
//       ingredients: req.body.ingredients,
//       instructions: req.body.instructions,
//     },
//   });
//   res.render("cocktails/favorites.ejs", { favorites: favorites });
// }

// async function createFavorite(favoriteData, req, res) {
//   const [favorite] = await db.cocktail.findOrCreate({
//     where: {
//       name: favoriteData.name,
//       ingredients: favoriteData.ingredients,
//       instructions: favoriteData.instructions,
//     },
//   });
//   const user = await db.user.findByPk(res.locals.user.id);
//   const hasLink = await user.hasCocktail(favorite);
//   if (!hasLink) {
//     user.addCocktail(favorite);
//   }
//   res.redirect("cocktails/favorites.ejs");
//}
//  SECOND ATTEMPT END

// FIRST ATTEMPT START
// router.get("/favorites", async (req, res) => {
//   try {
//     const favorites = await db.cocktail.findAll({
//       where: {
//         name: req.body.name,
//         ingredients: req.body.ingredients,
//         instructions: req.body.instructions,
//       },
//     });
//     res.render("cocktails/favorites.ejs", { favorites: favorites });
//   } catch (err) {
//     console.log(err);
//   }
// });

// router.post("/favorites", async (req, res) => {
//   try {
//     const [favorite] = await db.cocktail.findOrCreate({
//       where: {
//         name: req.body.name,
//         ingredients: req.body.ingredients,
//         instructions: req.body.instructions,
//       },
//     });
//     const user = await db.user.findByPk(res.locals.user.id);
//     const hasLink = await user.hasCocktail(favorite);
//     if (!hasLink) {
//       user.addCocktail(favorite);
//     }
//     res.render("cocktails/favorites.ejs", { favorites: favorite });
//   } catch (err) {
//     console.log(err);
//   }
// });
// FIRST ATTEMPT END
router.get("/comments", (req, res) => {
  res.render("cocktails/comments.ejs", {
    user: res.locals.user,
  });
});

// res.redirect(req.get('referer'))

module.exports = router;
