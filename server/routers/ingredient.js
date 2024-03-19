const {
    createIngre,
    updateIngre,
    deleteIngre,
    getIngres,
    getIngreById, 
    getIngreByRecipe
} = require("../controllers/ingredientController")

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
router.post('/ingredient', upload.single('image') , createIngre);
    
// UPDATE
router.patch('/ingredient/:id', updateIngre);
    
//DELETE
router.delete('/ingredient/:id', deleteIngre);

//GET 
router.get('/ingredient', getIngres);
router.get('/ingredient/:id', getIngreById);
router.get('/ingredient/recipe/:recipeId', getIngreByRecipe);
    
    
module.exports = router;