const mongoose = require('mongoose')
const express = require('express')
const router = express.Router()

//Model
const Brand = require('../models/brand.js')

//! -- Routes

//Index route - browse brands
router.get('/', async (req, res) => {
    try {
        const brands = await Brand.find()
        console.log(brands)
        res.render('brands/index.ejs', { brands })
    } catch (error) {
        console.log(error)
        return res.status(500).send('An error occured')
    }
})

//New page - form
router.get('/new', (req, res) => {
    res.render('brands/new.ejs')
})

//Create route
router.post('/', async (req, res) => {
    try {
        await Brand.create(req.body)
        return res.redirect('/brands')
    } catch (error) {
        console.log(error)
        res.status(500).send('An error occured')
    }
})

//Show page


//Edit page - form

//Update route

//Delete route

module.exports = router