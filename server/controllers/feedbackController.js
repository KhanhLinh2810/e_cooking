const { default: mongoose } = require("mongoose")
const Feedback = require("../models/Feedback")
const Recipe = require("../models/Recipe")

const createFeedback = async (req, res) => {
    try {
        if(!req.body.content) {
            return res.status(400).json({message: "The content of feedback is required"})
        }
        const recipe = await Recipe.findById(req.params.id)
        const feedback = new Feedback ({
            content: req.body.content,
            recipe: recipe,
            //user
            
        })

        res.status(201).send(feedback)
    } catch (error) {
        res.status(400).send(error)
    }
}

const updateFeedback = async (req,res) => {
    const { feedbackId } = req.params;
    const { content } = req.body;
    try {
        const feedback = await Feedback.findByIdAndUpdate(
            feedbackId,
            { content },
            { new: true }
        );
        if (!feedback) {
            return res.status(404).json({ message: 'Feedback not found' });
        }
        return res.status(200).json({ message: 'Feedback updated successfully', feedback });
    } catch (error) {
        console.error('Failed to update feedback', error);
        return res.status(500).json({ message: 'Failed to update feedback' });
    }
}

const deleteFeedback = async (req,res) => {
    try {
        const feedback = await Feedback.findByIdAndDelete(req.params.id)
        if( !feedback ) {
            return res.status(404).json({message: 'Feedback not found'})
        }
        res.status(200)
    } catch (error) {
        res.status(500).json({message: 'Failed to delete feedback'})
    }
}

const getFeedbackByRecipe = async (req, res) => {
    try {
        const recipe = await Recipe.findById(req.params.recipe_id)
        if(!recipe) {
            return res.status(404).json({message: 'Recipe not found'})
        }
        const feedbacks = Feedback.find({}).populate("recipe")
        res.status(200).send(feedbacks)
    } catch (error) {
        res.status(500).json({message: 'Failed to get feedback by recipe_id'})
    }
}

module.exports = {
    createFeedback,
    updateFeedback,
    deleteFeedback,
    getFeedbackByRecipe,

}

