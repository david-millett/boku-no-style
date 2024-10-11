const serverless = require('serverless-http')
const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const session = require('express-session')
const MongoStore = require('connect-mongo')
require('dotenv/config')

//! -- Variables
const app = express()
const port = 4000

//! -- Controllers
const brandsController = require('../../controllers/brands.js')
const authController = require ('../../controllers/auth.js')

//! -- Middleware functions
const passUserToView = require('../../middleware/pass-user-to-view.js')

//! -- Middleware
app.use(morgan('dev'))
app.use(express.urlencoded({ extended: false }))
app.use(methodOverride('_method'))
app.use('/uploads', express.static('uploads'))
app.use(express.static('public'))
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: true,
        store: MongoStore.create({
            mongoUrl: process.env.MONGODB_URI,
        })
    })
)
app.use(passUserToView)

//! -- Route handlers
//* -- Landing page
app.get('/', async (req, res) => {
    res.render('index.ejs')
})

//* -- Controllers
app.use('/brands', brandsController)
app.use('/auth', authController)

//! -- 404
app.get('*', (req, res) => {
    return res.status(404).render('404.ejs')
})

//! -- Server connection
const startServers = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log('🔒 Established database connection')
    } catch (error) {
        console.log(error)
    }
}

startServers()

module.exports.handler = serverless(app)