const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }
}, {
    toObject: {virtuals: true }
})

userSchema.virtual('favouriteBrands', {
    ref: 'Brand',
    localField: '_id',
    foreignField: 'fans'
})

const User = mongoose.model('User', userSchema)

module.exports = User