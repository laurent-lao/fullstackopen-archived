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

const testUser = {
  username: 'root',
  name: 'iamroot',
  password: 'sekret',
}

const firstUser = async () => {
  const users = await usersInDb()

  return users[0]
}

const testTokenRequest = {
  username: testUser.username,
  password: testUser.password,
}

const getTestTokenFromApi = async (api) => {
  const resultToken = await api
    .post('/api/login')
    .send(testTokenRequest)

  return resultToken.body.token
}

const formatAuthHeaderFromToken = (token) => {
  const scheme = 'bearer'

  return scheme.concat(' ', token)
}

module.exports = {
  initialBlogs,
  nonExistingId,
  blogsInDb,
  usersInDb,
  firstUser,
  testUser,
  getTestTokenFromApi,
  formatAuthHeaderFromToken,
  testTokenRequest,
}
