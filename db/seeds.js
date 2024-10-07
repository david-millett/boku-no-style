const mongoose = require('mongoose')
require('dotenv/config')

// Models
const Brand = require('../models/brand')
const User = require('../models/user')

// Data
const brandData = require('./data/brands')
const userData = require('./data/users')

const runSeeds = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log('🔒 Established database connection')

        const deletedBrands = await Brand.deleteMany()
        console.log(`❌ ${deletedBrands.deletedCount} brands deleted from the database`)

        const deletedUsers = await User.deleteMany()
        console.log(`❌ ${deletedUsers.deletedCount} users deleted from the database`)

        const users = await User.create(userData)
        console.log(`👤 ${users.length} users added to the database`)

        const brandsWithAddedBy = brandData.map(brand => {
            brand.addedBy = users[Math.floor(Math.random() * users.length)]._id
            return brand
        })

        const brands = await Brand.create(brandsWithAddedBy)
        console.log(`👕 ${brands.length} brands added to the database`)

        await mongoose.connection.close()
        console.log('👋 Closing connection to MongoDB')

    } catch (error) {
        console.log(error)
    }
}

runSeeds()