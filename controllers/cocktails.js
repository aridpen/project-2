// create an instance of express routers
const express = require("express");
const db = require("../models");
const router = express.Router();
const axios = require("axios");
const methodOverride = require("method-override");
const app = express()

app.use(methodOverride("_method"));
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

// GET localhost:8000/cocktails/favorites see all favorited cocktails
router.get("/favorites", async (req, res) => {
  try {
    const favorites = await db.cocktail.findAll({
      include: [
        {
          model: db.comment,
          as: "comments",
        },
      ],
    });
    // console.log(favorites[0].comments[0].dataValues.comment);
    // console.log("\n" + favorites[0].dataValues.ingredients + "\n");
    let ingredients = favorites[0].dataValues.ingredients;

    // console.log(ingredients.split(","));
    res.render("cocktails/favorites.ejs", { favorites });
  } catch (err) {
    console.log(err);
  }
});

router.get("/comments", (req, res) => {
  res.render("cocktails/comments.ejs", {
    user: res.locals.user,
  });
});

router.post("/favorites/comments", async (req, res) => {
  try {
    // Validate the input
    if (!req.body.comment || !req.body.cocktailId) {
      // If any required fields are missing, return an error
      res.status(400).send({ error: "Comment and cocktail ID are required." });
      return;
    }

    // Save the comment to the database
    const comment = await db.comment.create({
      comment: req.body.comment,
      userId: res.locals.user.id,
      cocktailId: req.body.cocktailId,
    });
    res.redirect(req.get("referer"));
  } catch (err) {
    console.log(err);
  }
});

// DELETE localhost:8000/cocktails/favorites/:id delete a favorited cocktail by user
router.delete("/favorites/:id", async (req, res) => {
  try {
    console.log(req.params.id);
    const favorite = await db.cocktail.destroy({
      where: {
        id: req.params.id,
      },
    });
    // console.log(deletefavorite);
    res.redirect(req.get("referer"));
  } catch (err) {
    console.log(err);
  }
});

// router.get("/favorites/:id", async (req, res) => {
//   try {
//     const favorites = await db.cocktail.findByPk(req.params.id);
//     res.render("cocktails/favorites.ejs", { favorites });
//     console.log(favorites);
//   } catch (err) {
//     console.log(err);
//   }
// });
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
