import Home from "../pages/home";
import Login from "../pages/login";
import Register from "../pages/register";
import Profile from "../pages/profile";
import CreateIngreCuisinePage from "../pages/createIngreCuisine";

const publicRoutes = [
    { path: '/', component: Home},
    { path: '/login', component: Login},
    { path: '/register', component: Register},
    { path: '/profile/:username', component: Profile},    
    { path: '/addIngreCuisine', component: CreateIngreCuisinePage},
]

const privateRoutes = [

]

export {publicRoutes, privateRoutes}