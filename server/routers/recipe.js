const {
    createRecipe,
    deleteRecipe,
    getRecipes,
    getRecipeById,
    getRecipesByCuisinesAndIngres,
} = require("../controllers/recipeController")

const { auth } = require("../middlewares/auth")

const router = require('express').Router()
const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
    }
})

const upload = multer({
    storage: storage
})


// CREATE
router.post('/recipe', auth, upload.single('image') , createRecipe);
     
// UPDATE
    
//DELETE
router.delete('/recipe/:id', deleteRecipe);

//GET 
router.get('/recipes', getRecipes);
router.get('/recipe/:id', getRecipeById);
router.get('/recipesBy/cuisine/ingre', getRecipesByCuisinesAndIngres)
    
    
module.exports = router;