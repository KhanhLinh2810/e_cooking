import Home from "../pages/home";
import Login from "../pages/login";
import Register from "../pages/register";
import Profile from "../pages/profile";
import CreateRecipePage from "../pages/createRecipe";
import UpdateRecipePage from "../pages/updateRecipe";
import CreateIngreCuisinePage from "../pages/createIngreCuisine";

const publicRoutes = [
    { path: '/', component: Home},
    { path: '/login', component: Login},
    { path: '/register', component: Register},
    { path: '/profile/:username', component: Profile},    
    { path: '/create', component: CreateRecipePage}, 
    { path: '/recipe/update/:recipeId', component: UpdateRecipePage},        
    { path: '/addIngreCuisine', component: CreateIngreCuisinePage},
]

const privateRoutes = [

]

export {publicRoutes, privateRoutes}