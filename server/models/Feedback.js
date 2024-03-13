const { default: mongoose } = require("mongoose");

const User = require("../models/User");
const Recipe = require("../models/Recipe")

const feedbackSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    },
    forRecipe: {
        type: mongoose.Types.ObjectId,
        ref: "Recipe"
    }
}, { timestamps: true });

module.exports = mongoose.model("Feedback", feedbackSchema)