import Login from "../pages/login";
import Register from "../pages/register";
import Home from "../pages/home";

const publicRoutes = [
    { path: '/', component: Home},
    { path: '/login', component: Login},
    { path: '/register', component: Register},
]

const privateRoutes = [

]

export {publicRoutes, privateRoutes}