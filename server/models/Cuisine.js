const { default: mongoose } = require("mongoose");

const CuisineSchema = new mongoose.Schema({
    cuisinename: {
        type: String,
        required: true,
        unique: true
    }
})

module.exports = mongoose.model('Cuisine', CuisineSchema)