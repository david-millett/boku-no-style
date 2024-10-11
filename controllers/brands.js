const mongoose = require('mongoose')
const express = require('express')

const router = express.Router()

//Model
const Brand = require('../models/brand.js')

//Middleware functions
const isSignedin = require('../middleware/is-signed-in.js')
const upload = require('../middleware/file-upload.js')

//! -- Routes

//Index route - browse brands
router.get('/', async (req, res) => {
    try {
        const brands = await Brand.find()
        res.render('brands/index.ejs', { brands })
    } catch (error) {
        console.log(error)
        return res.status(500).render('500.ejs')
    }
})

//New page - form
router.get('/new', isSignedin, (req, res) => {
    res.render('brands/new.ejs')
})

//Create route
router.post('/', isSignedin, upload.single('logo'), async (req, res) => {
    try {
        if (req.file) {
            req.body.logo = req.file.path
        }
        req.body.addedBy = req.session.user._id
        await Brand.create(req.body)
        return res.redirect('/brands')
    } catch (error) {
        console.log(error)
        return res.status(500).render('500.ejs')
    }
})

//Show page
router.get('/:brandId', async (req, res, next) => {
    try {
        if (mongoose.Schema.Types.ObjectId.isValid(req.params.brandId)) {
            const brand = await Brand.findById(req.params.brandId).populate('addedBy').populate('gallery.user')
            if (!brand) return next()
            return res.render('brands/show.ejs', { brand })
        } else {
            next()
        }
    } catch (error) {
        console.log(error)
        return res.status(500).render('500.ejs')
    }
})

//Edit page - form
router.get('/:brandId/edit', isSignedin, async (req, res, next) => {
    try {
        if (mongoose.Schema.Types.ObjectId.isValid(req.params.brandId)) {
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
        return res.status(500).render('500.ejs')
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
        return res.status(500).render('500.ejs')
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
        return res.status(500).render('500.ejs')
    }
})

//! -- Adding to/removing from favourites

//Add to favourites
router.post('/:brandId/favourites', isSignedin, async (req, res, next) => {
    try {
        const brand = await Brand.findById(req.params.brandId)
        if (!brand) return next()       
        brand.fans.push(req.session.user._id)
        await brand.save()
        return res.redirect(`/brands/${req.params.brandId}`)
    } catch (error) {
        console.log(error)
        //add error message
        return res.redirect(`/brands/${req.params.brandId}`)
    }
})

//Remove from favourites
router.delete('/:brandId/favourites', isSignedin, async (req, res, next) => {
    try {
        const brand = await Brand.findById(req.params.brandId)
        if (!brand) return next()       
        brand.fans.pull(req.session.user._id)
        await brand.save()
        return res.redirect(`/brands/${req.params.brandId}`)
    } catch (error) {
        console.log(error)
        //add error message
        return res.redirect(`/brands/${req.params.brandId}`)
    }
})

//! Adding images to and removing from the gallery

//Post image to gallery
router.post('/:brandId/gallery', isSignedin, upload.single('image'), async (req, res, next) => {
    try {
        req.body.user = req.session.user._id
        req.body.image = req.file.path
        const brand = await Brand.findById(req.params.brandId)
        if (!brand) return next()
        brand.gallery.push(req.body)
        await brand.save()
        return res.redirect(`/brands/${req.params.brandId}`)
    } catch (error) {
        console.log(error)
        return res.redirect(`/brands/${req.params.brandId}`)
    }
})

//Delete image from gallery
router.delete('/:brandId/gallery/:galleryId', isSignedin, async (req, res, next) => {
    try {
        const brand = await Brand.findById(req.params.brandId)
        if (!brand) return next()
        const postToDelete = brand.gallery.id(req.params.galleryId)
        if (!postToDelete) return next()
        postToDelete.deleteOne()
        await brand.save()
        return res.redirect(`/brands/${req.params.brandId}`)
    } catch (error) {
        console.log(error)
        return res.status(500).render('500.ejs')
    }
})

module.exports = router