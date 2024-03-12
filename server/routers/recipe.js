const {
    createRecipe,
    deleteRecipe,
    getRecipes,
    getRecipeById,
} = require("../controllers/recipeController")

const router = require('express').Router()

// CREATE
router.post('/recipe', createRecipe);
    
// UPDATE
    
//DELETE
router.delete('/recipe/:id', deleteRecipe);

//GET 
router.get('/recipes', getRecipes);
router.get('/recipe/:id', getRecipeById);
    
    
module.exports = router;