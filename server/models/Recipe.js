const { default: mongoose } = require("mongoose");
const User = require("../models/User");
const Ingredient = require("../models/Ingredient");

const RecipeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: false
    },
    timetocook: {
        type: Date,
        required: false
    },
    // video: {
    //     url: String,
    //     duration: Number,// giây
    // }
    // ingres: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Ingredient',
    //     required: true,
    // },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    },

}, { timestamps: true });

module.exports = mongoose.model("Recipe", RecipeSchema)