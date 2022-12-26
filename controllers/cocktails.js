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


// GET localhost:8000/cocktails/search/:search
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
      res.render('cocktails/results.ejs', { results: result });

    } catch (error) {
      console.error(error);
    }
  });


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