import Login from "../pages/login";
import Register from "../pages/register";
import Home from "../pages/home";
import Create from "../pages/create";
import CreateIngreCuisinePage from "../pages/createIngreCuisine";

const publicRoutes = [
    { path: '/', component: Home},
    { path: '/create', component: Create},
    { path: '/login', component: Login},
    { path: '/register', component: Register},
    { path: '/addIngreCuisine', component: CreateIngreCuisinePage},
]

const privateRoutes = [

]

export {publicRoutes, privateRoutes}