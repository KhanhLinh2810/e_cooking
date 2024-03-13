const Ingredient = require("../models/Ingredient");
const Recipe = require("../models/Recipe");
const RecipeIngre = require("../models/RecipeIngre");
const RecipIngre = require("../models/RecipeIngre")

const createIngre = async (req, res) => {
    const { keyname, othername, image, description } = req.body;

    try {
        if(!keyname) {
            return res.status(400).json({message: 'Keyname is required'})
        }
        const ingre = new Ingredient({ keyname: keyname });
        if( othername ) {
            ingre.othername = othername
        }
        if( image ) {
            ingre.image = image
        }
        if( description ) {
            ingre.description = description
        }
        await ingre.save();
        res.status(201).send(ingre);
    } catch (error) {
        res.status(400).send(error)
    }
    
}

const updateIngre = async (req,res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['keyname', 'othername', 'image', 'description'];
    const isValidOperation = updates.every(update => allowedUpdates.includes(update));
    if(!isValidOperation) {
        return res.status(400).send({ error: 'Invaid updates!' });
    }
    try {
        const ingre = await Ingredient.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true});
        if(!ingre) {
            return res.status(404).send(req.params);
        }
        res.status(200).send(ingre);
    } catch (error) {
        res.status(400).send(error);
    }
}

const deleteIngre = async (req, res) => {
    try {
        const ingre = await Ingredient.findByIdAndDelete(req.params.id);
        if(!ingre) {
            return res.status(404).send({ error: 'ingre not found' });
        }
    } catch (error) {
        res.status(500).send(error);
    }
}

const getIngres = async (req, res) => {
    try {
        const ingres = await Ingredient.find();
        res.status(200).send(ingres)
    } catch (err) {
        res.status(500).send(error);
    }
}

const getIngreById = async (req, res) => {
    try {
      const ingre = await Ingredient.findById(req.params.id);
      if (!ingre) {
        return res.status(404).send({ error: 'ingre not found' });
      }
      res.status(200).send(ingre);
    } catch (error) {
      res.status(500).send(error);
    }
}

const getIngreByRecipe = async (req,res) => {
    try {
        const recipe = await Recipe.findById(req.params.id)
        if( !recipe ) {
            return res.status(404).send({ error: 'Recipe not found' });
        }
        const ingres = await RecipeIngre.find({recipe: recipe}).populate("ingre")
        res.status(200).send(ingres)
    } catch (error) {
        res.status(500).send(error)
    }
}


module.exports = {
    createIngre,
    updateIngre,
    deleteIngre,
    getIngres,
    getIngreById, 
    getIngreByRecipe
}
