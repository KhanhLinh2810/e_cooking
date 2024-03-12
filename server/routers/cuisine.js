const { createCuisine, deleteCuisine } = require("../controllers/cuisineController")
const router = require('express').Router()

// CREATE
router.post('/cuisine', createCuisine);

//DELETE
router.delete('/cuisine/:id', deleteCuisine);


module.exports = router;