const Recipe = require("../models/Recipe");
const RecipeIngre = require("../models/RecipeIngre");

const createRecipe = async (req,res) => {
    const { title, content, timetocook, image, ingres } = req.body;
    try {
        const recipe = new Recipe({ title, content, timetocook, image });
        await recipe.save()

        for( const ingreId of ingres ) {
            const recipeIngre = new RecipeIngre({
                recipe: recipe._id,
                ingre: ingreId
            })
            await recipeIngre.save()
        }
        return res.status(201).json({ message: 'Recipe are created!'})
    } catch (error) {
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
    getRecipeById, 
}