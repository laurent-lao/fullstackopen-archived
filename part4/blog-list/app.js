const express = require('express')

const cors = require('cors')
const mongoose = require('mongoose')
const config = require('./utils/config')
const blogsRouter = require('./controllers/blogs')

const app = express()

const mongoUrl = config.MONGODB_URI
mongoose.connect(mongoUrl, {
  useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true,
})

app.use(cors())
app.use(express.json())

app.use('/api/blogs', blogsRouter)

module.exports = app
