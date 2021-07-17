const Blog = require('../models/blog')
const sampleBlogs = require('./sampleBlogs')

const initialBlogs = [...sampleBlogs.listWithManyBlogs]

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map((blog) => blog.toJSON())
}

module.exports = {
  initialBlogs,
  blogsInDb,
}
