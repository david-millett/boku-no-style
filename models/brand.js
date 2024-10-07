const mongoose = require('mongoose')

const brandSchema = new mongoose.Schema({
    name: { type: String, required: true },
    website: String,
    established: String,
    priceRange: String,
    // location:
    description: String,
    // logo: String,
    // heroImg: String,
    // createdBy: 
    // comments:
    // gallery:
    addedBy: { type: mongoose.Types.ObjectId, ref: 'User', require: true }
})

const Brand = mongoose.model("Brand", brandSchema)

module.exports = Brand