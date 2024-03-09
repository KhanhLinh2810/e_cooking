const { default: mongoose } = require("mongoose");
const Recipe = require("../models/Recipe")
const Ingredient = require("../models/Ingredient")

const RecipeIngreSchema = new mongoose.Schema({
    recipe: {
        type: mongoose.Types.ObjectId,
        ref: "Recipe"
    },
    ingre: {
        type: mongoose.Types.ObjectId,
        ref: "Ingredient"
    }
})

module.exports = mongoose.model("RecipIngre", RecipeIngreSchema)