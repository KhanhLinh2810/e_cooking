const { default: mongoose } = require("mongoose");
const Recipe = require("../models/Recipe")
const Cuisine = require("../models/Cuisine")

const RecipeCuisinechema = new mongoose.Schema({
    recipe: {
        type: mongoose.Types.ObjectId,
        ref: "Recipe"
    },
    cuisine: {
        type: mongoose.Types.ObjectId,
        ref: "Cuisine"
    }
})

module.exports = mongoose.model("RecipCuisine", RecipeCuisineSchema)