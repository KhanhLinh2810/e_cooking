const { default: mongoose } = require("mongoose");

const IngredientSchema = new mongoose.Schema ({
    keyname: {
        type: String,
        required: true,
        unique: true,
    },
    othername: {
        type: String,
        required: false
    },
    image: {
        type: String,
        required: false
    },
    description: {
        type: String,
        required: false
    }
}) 

module.exports = mongoose.model('Ingredient', IngredientSchema)