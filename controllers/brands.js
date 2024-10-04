const mongoose = require('mongoose')
const express = require('express')
const router = express.Router()

//Model
const Brand = require('../models/brand.js')

//! -- Routes

//Index route - browse brands
router.get('/', (req, res) => {
    try {
        res.send('Browse brands')
    } catch (error) {
        console.log(error)
        return res.status(500).send('An error occured')
    }
})

//New page - form

//Create route

//Show page

//Edit page - form

//Update route

//Delete route

module.exports = router