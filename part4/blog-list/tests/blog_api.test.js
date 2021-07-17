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
    const blogsAtStart = await helper.blogsInDb()

    expect(response.body).toHaveLength(6)
    expect(blogsAtStart).toHaveLength(6)
  })

  test('blogs have property \'id\'', async () => {
    const response = await api.get('/api/blogs')

    response.body.map((item) => expect(item.id).toBeDefined())
  })
})

describe('addition of a blog', () => {
  test('succeeds with valid data', async () => {
    const newBlog = {
      title: 'Test Blog',
      author: 'Test Author',
      url: 'http://testurl.com/',
      likes: 2,
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')

    const titles = response.body.map((item) => item.title)

    expect(response.body).toHaveLength(helper.initialBlogs.length + 1)
    expect(titles).toContain(
      'Test Blog',
    )
  })
})
// describe('viewing a specific blog', () => {
//   test('succeeds with a valid id', async () => {
//     const blogsAtStart = await helper.blogsInDb()
//     const blogToView = blogsAtStart[0]

//     const resultBlog = await api
//       .get(`/api/blogs/${blogToView.id}`)
//       .expect(200)
//       .expect('Content-Type', /application\/json/)

//     const processedBlogToView = JSON.parse(JSON.stringify(blogToView))

//     expect(resultBlog.body).toEqual(processedBlogToView)
//   })
// })

afterAll(() => {
  mongoose.connection.close()
})
