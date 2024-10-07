const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const session = require('express-session')
require('dotenv/config')

//! -- Variables
const app = express()
const port = 3000

//! -- Controllers
const brandsController = require('./controllers/brands.js')
const authController = require ('./controllers/auth.js')

//! -- Middleware
app.use(morgan('dev'))
app.use(express.urlencoded({ extended: false }))
app.use(methodOverride('_method'))
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: true,
    })
)

//! -- Route handlers
//* -- Landing page
app.get('/', async (req, res) => {
    res.render('index.ejs', {
        user: req.session.user,
    })
})

//* -- Controllers
app.use('/brands', brandsController)
app.use('/auth', authController)

//! -- Server connection
const startServers = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log('🔒 Established database connection')
        app.listen(port, () => {
            console.log(`🌟 Listening on port ${port}`)
        })
    } catch (error) {
        console.log(error)
    }
}

startServers()