const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const helper = require('./test_helper')

const api = supertest(app)
beforeEach(async () => {
  await Blog.deleteMany({})

  // Thanks to mongoose
  await Blog.insertMany(helper.initialBlogs)

  // // Parallel
  // const blogObjects = helper.initialBlogs
  //   .map((blog) => new Blog(blog))
  // const promiseArray = blogObjects
  //   .map((note) => note.save())
  // await Promise.all(promiseArray)

  // One By One
  // let blogObject = new Blog(helper.initialBlogs[0])
  // await blogObject.save()
  // blogObject = new Blog(helper.initialBlogs[1])
  // await blogObject.save()

  // Sequentially FORCE ORDER (forEach does not work well in async)
  // for (let blog of helper.initialBlogs) {
  //   let blogObject = new Blog(blog)
  //   await blogObject.save()
  // }
})
describe('when there are initially some blogs saved', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('there are six blogs', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(6)
  })

  test('blogs have property \'id\'', async () => {
    const response = await api.get('/api/blogs')

    response.body.map((item) => expect(item.id).toBeDefined())
  })
})

afterAll(() => {
  mongoose.connection.close()
})
