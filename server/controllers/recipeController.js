const Recipe = require("../models/Recipe");
const RecipeIngre = require("../models/RecipeIngre");
const RecipeCuisine = require("../models/RecipeCuisine");
const { default: mongoose } = require("mongoose");
const bodyParser = require('body-parser');

const createRecipe = async (req,res) => {
    const { title, content, timetocook, ingres, cuisines } = req.body;
    const image = req.file.filename;
    const ingredients = JSON.parse(ingres);
    const parse_cuisines = JSON.parse(cuisines);

    try {
        const recipe = new Recipe({ 
            title, 
            content, 
            timetocook, 
            image,
            createdBy: req.user._id,
        });
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
        const recipe = await Recipe.findById(req.params.id)
        console.log(req.user._id)
        console.log(recipe.createdBy)
        if( !recipe ) {
            console.log("1")
            return res.json({ message: "Recipe not found"})
        } 
        else if(!recipe.createdBy.equals(req.user._id)) {
            console.log("2")
            return res.json({ message: "You are not the author of this recipe"})
        } 
        else {
            console.log("3")
            await Recipe.findByIdAndDelete(req.params.id)
            //Xóa mối quan hệ giữa recipe và ingredient
            await RecipeIngre.deleteMany({ recipe: req.params.id })
            res.status(200).json({ message: "Recipe deleted successfully"})
        }
    } catch (error) {
        res.status(500).send(error)
    }
}

const getRecipes = async (req, res) => {
    try {
        const recipes = await Recipe.find();
        if( !recipes ) {
            return res.status(404).json({ message: "Fail to get recipes" });
        } 
        res.status(200).send(recipes);
    } catch (error) {
        res.status(500).send(error)
    }
}

const getRecipeByUser = async (req,res) => {
    try {
        const userId = req.params.userId;
        const recipes = await Recipe.find({ createdBy: userId});
        res.status(200).send(recipes)
    } catch (err) {
        res.status(500).send(err)
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

const getRecipesByCuisinesAndIngres = async (req, res) => {
    try {
        const { cuisines, ingres } = req.query;
        const allRecipes = await Recipe.find();

        const recipes = [];

        for( const recipe of allRecipes) {
            const recipeIngres = await RecipeIngre.find({recipe: recipe}).populate("ingre")
            const matchingIngres = (!ingres) ? [{}]
                : recipeIngres.filter((recipeIngre) =>
                    ingres.includes(recipeIngre.ingre._id.toString())
                );
                console.log(matchingIngres)
            
            
            const recipeCuisines = await RecipeCuisine.find({recipe: recipe}).populate("cuisine")
            const matchingCuisines = (!cuisines) ? [{}]
                : recipeCuisines.filter((recipeCuisine) =>
                    cuisines.includes(recipeCuisine.cuisine._id.toString())
                );
            
            console.log(matchingCuisines)
            
            if (matchingCuisines.length > 0 && matchingIngres.length > 0) {
                recipes.push(recipe);
            }
        }

        res.status(200).send(recipes);
        console.log("hi", recipes)
        
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
};

module.exports = {
    createRecipe,
    deleteRecipe,
    getRecipes,
    getRecipeById, 
    getRecipeByUser,
    getRecipesByCuisinesAndIngres,
}