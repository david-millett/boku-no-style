const mongoose = require('mongoose')
const express = require('express')
const router = express.Router()

//Model
const Brand = require('../models/brand.js')

//Middleware functions
const isSignedin = require('../middleware/is-signed-in.js')

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
router.get('/new', isSignedin, (req, res) => {
    res.render('brands/new.ejs')
})

//Create route
router.post('/', isSignedin, async (req, res) => {
    try {
        await Brand.create(req.body)
        return res.redirect('/brands')
    } catch (error) {
        console.log(error)
        return res.status(500).send('An error occured')
    }
})

//Show page
router.get('/:brandId', async (req, res) => {
    try {
        const brand = await Brand.findById(req.params.brandId)
        console.log(brand)
        res.render('brands/show.ejs', { brand })
    } catch (error) {
        console.log(error)
        return res.status(500).send('An error occurred')
    }
})

//Edit page - form
router.get('/:brandId/edit', async (req, res) => {
    try {
        const brand = await Brand.findById(req.params.brandId)
        console.log(brand)
        return res.render('brands/edit.ejs', { brand })
    } catch (error) {
        console.log(error)
        return res.status(500).send('An error occurred')
    }
})

//Update route
router.put('/:brandId', async (req, res) => {
    try {
        await Brand.findByIdAndUpdate(req.params.brandId, req.body)
        return res.redirect(`/brands/${req.params.brandId}`)
    } catch (error) {
        console.log(error)
        return res.status(500).send('An error occurred')
    }
})

//Delete route
router.delete('/:brandId', async (req, res) => {
    try {
        await Brand.findByIdAndDelete(req.params.brandId)
        return res.redirect('/brands')
    } catch (error) {
        console.log(error)
        return res.status(500).send('An error occurred')
    }
})

module.exports = router