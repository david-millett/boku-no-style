const mongoose = require('mongoose')

const brandSchema = new mongoose.Schema({
    name: { type: String, required: true },
    website: String,
    established: Number,
    priceRange: Number,
    // location:
    description: String,
    logo: String,
    heroImg: String,
    // createdBy: 
    // comments:
    // gallery:
})

const Brand = mongoose.model("Brand", brandSchema)

module.exports = Brand