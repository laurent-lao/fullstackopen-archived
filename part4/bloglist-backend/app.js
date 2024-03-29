const express = require('express')
require('express-async-errors')

const cors = require('cors')
const mongoose = require('mongoose')
const config = require('./utils/config')
const middleware = require('./utils/middleware')

const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')

const app = express()

const mongoUrl = config.MONGODB_URI
mongoose.connect(mongoUrl, {
  useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true,
})

app.use(cors())
app.use(express.json())

// Middlewares
app.use(middleware.tokenExtractor)
// app.use(middleware.userExtractor) // for every routes (right now just for post/delete)

// Routes
app.use('/api/blogs', blogsRouter)
// app.use('/api/blogs', middleware.userExtractor, blogsRouter) // to apply middleware to route
app.use('/api/login', loginRouter)
app.use('/api/users', usersRouter)
app.use(middleware.unknownEndpoint)

// Must be last loaded middleware
app.use(middleware.errorHandler)

module.exports = app
