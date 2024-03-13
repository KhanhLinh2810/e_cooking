import Login from "../pages/login";
import Register from "../pages/register";
import Home from "../pages/home";
import Create from "../pages/create";
import CreateIngrePage from "../pages/createIngre";

const publicRoutes = [
    { path: '/', component: Home},
    { path: '/create', component: Create},
    { path: '/login', component: Login},
    { path: '/register', component: Register},
    { path: '/createIngre', component: CreateIngrePage},
]

const privateRoutes = [

]

export {publicRoutes, privateRoutes}