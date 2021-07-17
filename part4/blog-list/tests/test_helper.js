const Blog = require('../models/blog')
const sampleBlogs = require('./sampleBlogs')

const initialBlogs = [...sampleBlogs.listWithManyBlogs]

module.exports = {
  initialBlogs,
}
