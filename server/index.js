const express = require('express');
const cors = require('cors');
const { db } = require('./db/db');
const { readdirSync } = require('fs');
const app = express()
const userRouter = require('./routers/user');
const loginRouter = require('./routers/login');
const recipeRouter = require('./routers/recipe');
const cuisineRouter = require('./routers/cuisine');
const ingredientRouter = require('./routers/ingredient');
const bodyParser = require('body-parser');



require('dotenv').config()

const PORT = process.env.PORT

//middleware
app.use(express.json())
app.use(cors())
app.use(bodyParser.json());
app.use(express.static('public'))

//routes
readdirSync('./routers').map((route) => app.use('/api/v1', require('./routers/' + route)))

const server = () => {
    db()
    app.listen(PORT, () => {
        console.log('listening to port:', PORT)
    })
    app.use('/api', userRouter);
    app.use('/api', loginRouter);
    app.use('/api', recipeRouter);
    app.use('/api', cuisineRouter);
    app.use('/api', ingredientRouter);
}

server()