const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

// Get all users
usersRouter.get('/', async (request, response) => {
  const users = await User
    .find({})
    .populate('blogs', {
      url: 1, title: 1, author: 1, id: 1,
    })

  response.json(users)
})

// Post one user
usersRouter.post('/', async (request, response) => {
  const { body } = request

  if (body.password.length < 3) {
    response.status(400).json({
      error: 'Password is shorter than the minimum allowed length (3).',
    }).end()
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash,
  })

  const savedUser = await user.save()

  response.json(savedUser)
})

// Delete one user
usersRouter.delete('/:id', async (request, response) => {
  await User.findByIdAndRemove(request.params.id)

  response.status(204).end()
})

module.exports = usersRouter
