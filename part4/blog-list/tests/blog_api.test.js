const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
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

describe('viewing a specific blog', () => {
  test('succeeds with a valid id', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToView = blogsAtStart[0]

    const resultBlog = await api
      .get(`/api/blogs/${blogToView.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const processedBlogToView = JSON.parse(JSON.stringify(blogToView))

    expect(resultBlog.body).toEqual(processedBlogToView)
  })
  test('fails with statuscode 404 if blog does not exist', async () => {
    const validNonexistingId = await helper.nonExistingId()

    await api
      .get(`/api/blogs/${validNonexistingId}`)
      .expect(404)
  })
  test('fails with statuscode 400 if id is invalid', async () => {
    const invalidId = '5a3d5da59070081a82a3445'

    await api
      .get(`/api/blogs/${invalidId}`)
      .expect(400)
  })
})

describe('addition of a blog', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash(helper.testUser.password, 10)
    const user = new User({ 
      username: helper.testUser.username,
      name: helper.testUser.name,
      passwordHash,
    })

    await user.save()
  })
  test('succeeds with valid data', async () => {
    const testUser = await helper.firstUser()

    const newBlog = {
      title: 'Test Blog',
      author: 'Test Author',
      url: 'http://testurl.com/',
      likes: 2,
      userId: testUser.id,
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

    const titles = blogsAtEnd.map((blog) => blog.title)
    expect(titles).toContain(
      'Test Blog',
    )

    const getPopulatedFields = async () => {
      const response = await api.get('/api/blogs')
      const allBlogs = response.body
      const lastAddedBlog = allBlogs[allBlogs.length - 1]

      return lastAddedBlog.user
    }

    const shouldBePopulated = await getPopulatedFields()

    expect(shouldBePopulated.name).toEqual(helper.testUser.name)
    expect(shouldBePopulated.user).toEqual(helper.testUser.user)
  })
  test('succeeds even with missing likes', async () => {
    const testUser = await helper.firstUser()

    const newBlog = {
      title: 'Test Blog',
      author: 'Test Author',
      url: 'http://testurl.com/',
      userId: testUser.id,
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    blogsAtEnd.map((blog) => expect(blog.likes).toBeDefined())
  })
  test('fails when missing title and url', async () => {
    const testUser = await helper.firstUser()

    const newBlog = {
      author: 'Test Author',
      likes: 2,
      userId: testUser.id,
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  })
})

describe('deletion of a blog', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(
      helper.initialBlogs.length - 1,
    )

    const titles = blogsAtEnd.map((blog) => blog.titles)

    expect(titles).not.toContain(blogToDelete.title)
  })
})

describe('update of a blog', () => {
  test('succeeds with a valid id', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]

    const newBlog = {
      // title: blogToUpdate.title,
      // author: blogToUpdate.author,
      // url: blogToUpdate.url,
      likes: blogToUpdate.likes + 1,
    }

    const resultBlog = await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const processedBlogToUpdate = JSON.parse(JSON.stringify(blogToUpdate))
    expect(resultBlog.body.likes).toBe(processedBlogToUpdate.likes + 1)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)

    expect(resultBlog.body.author).toEqual(processedBlogToUpdate.author)
  })
})

// Last operation
afterAll(() => {
  mongoose.connection.close()
})
