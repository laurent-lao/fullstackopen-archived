const bcrypt = require('bcrypt')
const supertest = require('supertest')
const mongoose = require('mongoose')
const User = require('../models/user')
const helper = require('./test_helper')
const app = require('../app')

const api = supertest(app)

describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash(helper.testUser.password, 10)
    const user = new User({ username: helper.testUser.username, passwordHash })

    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map((u) => u.username)
    expect(usernames).toContain(newUser.username)
  })
  // TODO
  test('blogs can be attached and field is populated', async () => {
    const testUser = await helper.firstUser()

    // use current user to attach blog
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

    const getPopulatedFieldsOfFirstBlogInUser = async () => {
      const response = await api.get('/api/users')
      const allUsers = response.body
      const firstUser = allUsers[0]

      return firstUser.blogs[0]
    }

    const shouldBePopulated = await getPopulatedFieldsOfFirstBlogInUser()

    expect(shouldBePopulated.url).toEqual(newBlog.url)
    expect(shouldBePopulated.title).toEqual(newBlog.title)
    expect(shouldBePopulated.author).toEqual(newBlog.author)
  })
  test('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'salainen',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('`username` to be unique')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })
  test('creation fails with proper statuscode and message if username is too short', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'ro',
      name: 'Superuser',
      password: 'salainen',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('`username`')
    expect(result.body.error).toContain('is shorter than')
    expect(result.body.error).toContain('(3)')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })
  test('creation fails with proper statuscode and message if password is too short', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'other',
      name: 'Superuser',
      password: 'sa',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('Password is shorter than the minimum allowed length (3)')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })
})

// Last operation
afterAll(() => {
  mongoose.connection.close()
})
