const mongoose = require('mongoose')
const express = require('express')
const bcrypt = require('bcryptjs')
const router = express.Router()


// ! -- Model
const User = require('../models/user')

// ! -- Routes

//Sign up form
router.get('/sign-up', (req, res) => {
    return res.render('auth/sign-up.ejs')
})

//Sign up - create user
router.post('/sign-up', async (req, res) => {
    try {
        const userInDatabase = await User.findOne({ username: req.body.username })
        if (userInDatabase) {
            return res.send('Username already taken')
        }
        if (req.body.password !== req.body.confirmPassword) {
            return res.send('Password and Confirm Password must match')
        }
        req.body.password = bcrypt.hashSync(req.body.password)
        const newUser = await User.create(req.body)
        //create session to sign user in
        return res.redirect('/')


    } catch (error) {
        console.log(error)
        res.status(500).send('An error has occurred')
    }
})

//Sign in form
router.get('/sign-in', (req, res) => {
    return res.render('auth/sign-in.ejs')
})

//Sign in user
router.post('/sign-in', async (req, res) => {
    try {
        console.log(req.body)
        console.log(req.session)
        const userInDatabase = await User.findOne({ username: req.body.username })
        if (!userInDatabase) {
            return res.status(401).send('Login failed. Please try again.')
        }
        if (!bcrypt.compareSync(req.body.password, userInDatabase.password)) {
            return res.status(401).send('Login failed. Please try again.')
        }
        req.session.user = {
            username: userInDatabase.username,
            _id: userInDatabase._id,
        }
        res.redirect('/')
    } catch (error) {
        console.log(error)
        res.status(500).send('An error occurred')
    }
})

//Sign out

//Profile page




module.exports = router