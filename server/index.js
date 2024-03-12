const express = require('express');
const cors = require('cors');
const { db } = require('./db/db');
const { readdirSync } = require('fs');
const app = express()
const userRouter = require('./routers/user');
const recipeRouter = require('./routers/recipe');

require('dotenv').config()

const PORT = process.env.PORT

//middleware
app.use(express.json())
app.use(cors())

//routes
readdirSync('./routers').map((route) => app.use('/api/v1', require('./routers/' + route)))

const server = () => {
    db()
    app.listen(PORT, () => {
        console.log('listening to port:', PORT)
    })
    app.use('/api', userRouter);
    app.use('/api', recipeRouter);
}

server()