const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

// ========== By Async/Await =========

// Get all blogs
blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs.map((blog) => blog.toJSON()))
})

// Get one blog
blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  return blog
    ? response.json(blog)
    : response.status(404).end()
})

// Post one blog
// eslint-disable-next-line no-unused-vars
blogsRouter.post('/', async (request, response) => {
  const { body } = request

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
  })

  const savedBlog = await blog.save()
  response.json(savedBlog)
})

// ========= By Promises ============
// blogsRouter.get('/', (request, response) => {
//   Blog
//     .find({})
//     .then((blogs) => {
//       response.json(blogs)
//     })
// })

// blogsRouter.post('/', (request, response) => {
//   const blog = new Blog(request.body)

//   blog
//     .save()
//     .then((result) => {
//       response.status(201).json(result)
//     })
// })

module.exports = blogsRouter
