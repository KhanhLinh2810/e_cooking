const Recipe = require("../models/Recipe");
const RecipeIngre = require("../models/RecipeIngre");
const RecipCuisine = require("../models/RecipeCuisine");
const { default: mongoose } = require("mongoose");
const bodyParser = require('body-parser');

const createRecipe = async (req,res) => {
    const { title, content, timetocook, ingres, cuisines } = req.body;
    const image = req.file.filename;
    const ingredients = JSON.parse(ingres);
    const parse_cuisines = JSON.parse(cuisines);

    try {
        const recipe = new Recipe({ title, content, timetocook, image, parse_cuisines});
        await recipe.save()

        for( const ingreId of ingredients ) {
            const recipeIngre = new RecipeIngre({
                recipe: recipe._id,
                ingre: ingreId,
            })
            await recipeIngre.save()
        }

        for( const cuisineId of parse_cuisines ) {
            const recipeCuisine = new RecipeCuisine({
                recipe: recipe._id,
                cuisine: cuisineId,
            })
            await recipeCuisine.save()
        }        
        return res.status(201).json({ message: 'Recipe are created!'})
    } catch (error) {
        console.log(error);
        res.status(500).send(error)
    }
}

const deleteRecipe = async (req,res) => {
    try {
        const recipe = await Recipe.findByIdAndDelete(req.params.id)
        if( !recipe ) {
            return res.status(404).json({ message: "Recipe not found"})
        }
        //Xóa mối quan hệ giữa recipe và ingredient
        await RecipeIngre.deleteMany({ recipe: req.params.id })

        res.status(200).json({ message: "Recipe deleted successfully"})
    } catch (error) {
        res.status(500).send(error)
    }
}

const getRecipes = async (req, res) => {
    try {
        const recipes = await Recipe.find();
        console.log(recipes)
        if( !recipes ) {
            return res.status(404).json({ message: "Fail to get recipes" });
        } 
        res.status(200).send(recipes);
    } catch (error) {
        res.status(500).send(error)
    }
}

const getRecipeById = async (req,res) => {
    const recipe = await Recipe.findById(req.params.id)
    try {
        if( !recipe ) {
            return res.status(404).send(error)
        }
        res.status(200).send(recipe)
    } catch (error) {
        res.status(500).send(error)
    }
}

module.exports = {
    createRecipe,
    deleteRecipe,
    getRecipes,
    getRecipeById, 
}