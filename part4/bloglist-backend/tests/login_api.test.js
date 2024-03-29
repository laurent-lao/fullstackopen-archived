const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const User = require('../models/user')
const helper = require('./test_helper')

const api = supertest(app)

beforeEach(async () => {
  // Create test user
  await User.deleteMany({})

  const passwordHash = await bcrypt.hash(helper.testUser.password, 10)
  const user = new User({ username: helper.testUser.username, passwordHash })

  await user.save()
})

describe('creation of a token', () => {
  test('succeeds with a valid username and password', async () => {
    const resultToken = await api
      .post('/api/login')
      .send(helper.testTokenRequest)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(resultToken.body.token).toBeDefined()
    expect(helper.getTestTokenFromApi(api)).toBeDefined()
  })
  test('fails with status code 401 with an invalid username', async () => {
    const newTokenRequest = {
      username: 'InvalidUsername',
      password: helper.testUser.password,
    }

    await api
      .post('/api/login')
      .send(newTokenRequest)
      .expect(401)
  })
  test('fails with status code 401 with an invalid password', async () => {
    const newTokenRequest = {
      username: helper.testUser.username,
      password: 'InvalidPassword',
    }

    await api
      .post('/api/login')
      .send(newTokenRequest)
      .expect(401)
  })
})

test('auth header formatter has correct concat behaviour', () => {
  expect(helper.formatAuthHeaderFromToken('test')).toEqual('bearer test')
})
// Last operation
afterAll(() => {
  mongoose.connection.close()
})
