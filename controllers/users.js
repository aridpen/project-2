//create an instance of express routers
const express = require('express')
const db = require('../models')
const router = express.Router()

//mount our routes on the router

//GET /users -- creates serves a form to create a new user
router.get('/new', (req, res) => {
    res.render('users/new.ejs')
})

//POST /users --creates a new iser from the form @ /users/new
router.post('/', async (req, res) => {
    try {
    //based on the info in the req.body, find or create user
        const [newUser, created] = await db.user.findOrCreate({
            where: {
                email: req.body.email
            },
         //TODO: don't add plaintext passwords to the db
            defaults: {
                password: req.body.password
            }
        })
           //TODO: redirect to the login page if the user is found
            //log the user in (store the user's id as a coolie in the browser)
        res.cookie('userId', newUser.Id)
        //log the user in (store the user's id )
        res.redirect('/')
    } catch(err) {
        console.log(err);
        req.server(500).send('server error')
    }
})
//export the router
module.exports = router