const Cuisine = require("../models/Cuisine");

const createCuisine = async (req, res) => {
    const cuisine = new Cuisine ({
        cuisinename: req.body.name
    });
    try {
        if(!cuisinename) {
            return res.status(400).json({message: 'The name of cuisine is required!'})
        } 
        await cuisine.save();
        res.status(201).send(cuisine);
    } catch (error) {
        res.status(400).send(error);
    }
}

const deleteCuisine = async (req,res) => {
    try {
        const cuisine = await Cuisine.findByIdAndDelete(req.params.id);
        if(!cuisine) {
            return res.status(404).json({message: 'Cuisine is not found'})
        }
        res.status(200).json({ message: "Cuisine deleted successfully"})
    } catch (error) {
        res.status(500).send(error);
    }
}

// const getCuisineById = async (req, res) => {
//     try {
//       const cuisine = await Cuisine.findById(req.params.id);
//       if (!cuisine) {
//         return res.status(404).send({ error: 'cuisine not found' });
//       }
//       res.send(cuisine);
//     } catch (error) {
//       res.status(500).send(error);
//     }
// }

module.exports = {
    createCuisine,
    deleteCuisine,
    // getCuisineById
}