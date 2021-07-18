/* eslint-disable no-underscore-dangle */
const Blog = require('../models/blog')
const User = require('../models/user')
const sampleBlogs = require('./sampleBlogs')

const initialBlogs = [...sampleBlogs.listWithManyBlogs]

const nonExistingId = async () => {
  const blog = new Blog({ title: 'willremovethissoon', url: 'http://thisistemporary.com' })
  await blog.save()
  await blog.remove()

  return blog._id.toString()
}
const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map((blog) => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map((u) => u.toJSON())
}

const firstUser = async () => {
  const users = await usersInDb()

  return users[0]
}

module.exports = {
  initialBlogs,
  nonExistingId,
  blogsInDb,
  usersInDb,
  firstUser,
}
