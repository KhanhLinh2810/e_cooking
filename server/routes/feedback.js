const { createFeedback,
    updateFeedback,
    deleteFeedback,
    getFeedbackByRecipe, } = require("../controllers/feedbackController")

const router = require('express').Router()

// CREATE
router.post('/feedback', createFeedback);
    
// UPDATE
router.patch('/feedback/:id', updateFeedback);
    
//DELETE
router.delete('/feedback/:id', deleteFeedback);

//GET 
router.get('/feedback/:recipe_id', getFeedbackByRecipe);
    
    
module.exports = router;