// create an instance of express routers
const express = require('express')
const db = require('../models')
const router = express.Router()
const axios = require('axios')

// GET localhost:8000/cocktails/search
router.get('/search', (req, res) => {
  res.render('cocktails/search.ejs', {
    user: res.locals.user
  })
})
// GET localhost:8000/cocktails/favorite
router.get('/favorites', (req, res) => {
  res.render('cocktails/favorites.ejs', {
    user: res.locals.user
  })
})
   
// GET localhost:8000/cocktails/comments
router.get('/comments', (req, res) => {
  res.render('cocktails/comments.ejs', {
    user: res.locals.user
  })
   })


// GET localhost:8000/cocktails/search
router.post('/search', async (req, res) => {
  const search = req.body.search;
  console.log(search);
    const url = `https://api.api-ninjas.com/v1/cocktail?name=${search}&$or=ingredient=${search}`;
    try {
      const response = await axios.get(url, {
        headers: {
          'x-api-key': process.env.API_KEY
        }
      });
      let result = await response.data
      console.log(result[0]);
      res.render('cocktails/results.ejs', { results: result });

    } catch (error) {
      console.error(error);
    }
});


 
//POST localhost:8000/cocktails/favorite
// router.post('/favorites', async (req, res) => {
//   //code to handle to favorite button goes here
//   const search = req.body.search
//   const url = `https://api.api-ninjas.com/v1/cocktail?name=${search}&$or=ingredient=${search}`;
//   try {
//     const response = await axios.post(url, {
//       headers: {
//     'x-api-key': process.env.API_KEY
//   }
//     })
//     let favorite = await response.data
//     console.log(favorite);
//     res.render('cocktails/favorites.ejs', {favorites: favorite})
//   } catch (error) {
//     console.error(error)
//   }
// })
// res.redirect(req.get('referer'))

module.exports = router

// //GET cocktails/:search allows search of drinks by keywords
// router.get('/:search', async (req, res) => {
//     const drinkName = `https://api.api-ninjas.com/v1/cocktail?name=${req.params.search}&$or=ingredient=${req.params.search}`
//     const config = {
//         headers: {'X-API-Key': process.env.API_KEY}
//     }
//     const getAPI = await axios.get(drinkName, config)
//     res.render('cocktails/results.ejs', {
//         user: res.locals.user,
//         cocktails: getAPI.data
//     })

// })

// router.post('/search', (req, res) => {
//     const parameter = req.body.parameter;
//     const apiUrl = `https://api.api-ninjas.com/v1/cocktail?name=${parameter}&$or=ingredient=${parameter}`;
//     router.get(apiUrl, (error, response, body) => {
//       if (error) {
//         // handle error
//         return;
//       }
//       const data = JSON.parse(body);
//       // render the results using an EJS template
//       res.render('results', { data });
//     });
//   });