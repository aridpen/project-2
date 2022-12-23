// create an instance of express routers
const express = require('express')
const db = require('../models')
const router = express.Router()
const axios = require('axios')


// router.get('/', (req, res) => {
//     console.log(res.locals.user)
//     res.render('cocktails/index.ejs', {
//         user: res.locals.user
//     })
// })
//GET cocktails/:name allows search of drinks by name
router.get('/:name', async (req, res) => {
    const drinkName = 'https://api.api-ninjas.com/v1/cocktail?name=' + req.params.name
    // const drinkInstructions = 
    const config = {
        headers: {'X-API-Key': process.env.API_KEY}
    }
    const getAPI = await axios.get(drinkName, config)
    res.render('cocktails/index.ejs', {
        user: res.locals.user,
        cocktails: getAPI.data
    })
})

module.exports = router