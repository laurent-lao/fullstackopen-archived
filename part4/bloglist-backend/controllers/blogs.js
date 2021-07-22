/* eslint-disable no-underscore-dangle */
const jwt = require('jsonwebtoken')
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const middleware = require('../utils/middleware')

// ========== By Async/Await =========

// Get all blogs
blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({})
    .populate('user', { username: 1, name: 1 })

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
blogsRouter.post('/', middleware.userExtractor, async (request, response) => {
  const { body, user } = request

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user.id,
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog.id)
  await user.save()

  return response.json(savedBlog)
})

// Put (update) one blog
blogsRouter.put('/:id', async (request, response) => {
  const { body } = request

  const blog = {
    // title: body.title,
    // author: body.author,
    // url: body.url,
    likes: body.likes,
  }

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true, runValidators: true, context: 'query' })
  response.json(updatedBlog)
})

// Delete one blog
blogsRouter.delete('/:id', middleware.userExtractor, async (request, response) => {
  const { user } = request

  const blog = await Blog.findById(request.params.id)

  if (blog.user.toString() === user.id.toString()) {
    await Blog.findByIdAndRemove(request.params.id)
    return response.status(204).end()
  }

  return response.status(403).json({ error: 'token does not have ownership' })
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
