const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
require('dotenv/config')

//! -- Variables

const app = express()
const port = 3000


//! -- Middleware

app.use(morgan('dev'))

//! -- Route handlers

//* -- Landing page
app.get('/', async (req, res) => {
    res.render('index.ejs')
})

//* -- Routers


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