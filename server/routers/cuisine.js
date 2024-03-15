const { createCuisine, deleteCuisine, getCuisines } = require("../controllers/cuisineController")
const router = require('express').Router()

// CREATE
router.post('/cuisine', createCuisine);

//DELETE
router.delete('/cuisine/:id', deleteCuisine);

//GET 
router.get('/cuisine', getCuisines);


module.exports = router;