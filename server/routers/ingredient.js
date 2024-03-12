const {
    createIngre,
    updateIngre,
    deleteIngre,
    getIngreById, 
    getIngreByRecipe
} = require("../controllers/ingredientController")

const router = require('express').Router()

// CREATE
router.post('/ingredient', createIngre);
    
// UPDATE
router.patch('/ingredient/:id', updateIngre);
    
//DELETE
router.delete('/ingredient/:id', deleteIngre);

//GET 
router.get('/ingredient/:id', getIngreById);
router.get('/ingredient/recipe/:id', getIngreByRecipe);
    
    
module.exports = router;