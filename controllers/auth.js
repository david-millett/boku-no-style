const mongoose = require('mongoose')
const express = require('express')
const router = express.Router()

// ! -- Model

// ! -- Routes

//Sign up form
router.get('/sign-up', (req, res) => {
    return res.render('auth/sign-up.ejs')
})

//Sign up - create user


//Sign in form
router.get('/sign-in', (req, res) => {
    return res.render('auth/sign-in.ejs')
})

//Sign in user


//Sign out

//Profile page




module.exports = router