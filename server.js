const express = require('express')
const morgan = require('morgan')


//! -- Variables

const app = express()
const port = 3000


//! -- Middleware
app.use(morgan('dev'))

//! -- Route handlers

//* -- Landing page
app.get('/', async (req, res) => {
    res.send("Home page")
})


//! -- Server connection

const startServers = () => {
    try {
        app.listen(port, () => {
            console.log(`🌟 Listening on port ${port}`)
        })
    } catch (error) {
        console.log(error)
    }
}

startServers()