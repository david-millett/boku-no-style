const mongoose = require('mongoose')

const gallerySchema = new mongoose.Schema({
    image: { type: String, required: true },
    caption: String,
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, {
    timestamps: true,
})

const brandSchema = new mongoose.Schema({
    name: { type: String, required: true },
    website: String,
    established: String,
    priceRange: String,
    description: String,
    logo: { type: String },
    // heroImg: { type: String },
    // comments:
    gallery: [gallerySchema],
    addedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', require: true },
    fans: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
})

const Brand = mongoose.model("Brand", brandSchema)

module.exports = Brand