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
router.get('/:brandId', async (req, res, next) => {
    try {
        if (mongoose.Types.ObjectId.isValid(req.params.brandId)) {
            const brand = await Brand.findById(req.params.brandId).populate('addedBy')
            if (!brand) return next()
            return res.render('brands/show.ejs', { brand })
        } else {
            next()
        }
    } catch (error) {
        console.log(error)
        return res.status(500).send('An error occurred')
    }
})

//Edit page - form
router.get('/:brandId/edit', isSignedin, async (req, res, next) => {
    try {
        if (mongoose.Types.ObjectId.isValid(req.params.brandId)) {
            const brand = await Brand.findById(req.params.brandId)
            if (!brand) return next()
            if (!brand.addedBy.equals(req.session.user._id)) {
                return res.redirect(`/brands/${req.params.brandId}`)
            }
            return res.render('brands/edit.ejs', { brand })
        } else {
            next()
        }

    } catch (error) {
        console.log(error)
        return res.status(500).send('An error occurred')
    }
})

//Update route
router.put('/:brandId', isSignedin, async (req, res) => {
    try {
        const brandToUpdate = await Brand.findById(req.params.brandId)
        if (brandToUpdate.addedBy.equals(req.session.user._id)) {
            await Brand.findByIdAndUpdate(req.params.brandId, req.body)
            return res.redirect(`/brands/${req.params.brandId}`)
        }
        throw new Error('You are not authorised to perform this action')
    } catch (error) {
        console.log(error)
        return res.status(500).send('An error occurred')
    }
})

//Delete route
router.delete('/:brandId', async (req, res) => {
    try {
        const brandToDelete = await Brand.findById(req.params.brandId)
        if (brandToDelete.addedBy.equals(req.session.user._id)) {
            await Brand.findByIdAndDelete(req.params.brandId)
            return res.redirect('/brands')
        }
        throw new Error('You are not authorised to perform this action')
    } catch (error) {
        console.log(error)
        return res.status(500).send('An error occurred')
    }
})

module.exports = router