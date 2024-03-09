const {
    createRecipe,
    deleteRecipe,
    getRecipeById,
} = require("../controllers/recipeController")

const router = require('express').Router()

// CREATE
router.post('/recipe', createRecipe);
    
// UPDATE
    
//DELETE
router.delete('/recipe/:id', deleteRecipe);

//GET 
router.get('/recipe/:id', getRecipeById);
    
    
module.exports = router;