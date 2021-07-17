const listHelper = require('../utils/list_helper')
const sampleBlogs = require('./sampleBlogs')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {
  // Clone sample arrays
  const listWithOneBlog = [...sampleBlogs.listWithOneBlog]
  const listWithManyBlogs = [...sampleBlogs.listWithManyBlogs]
  const listWithNoBlogs = [...sampleBlogs.listWithNoBlogs]

  test('when list has no blogs, equals 0', () => {
    const result = listHelper.totalLikes(listWithNoBlogs)
    expect(result).toBe(0)
  })

  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    expect(result).toBe(5)
  })

  test('when list has many blogs, equals the the total likes', () => {
    const result = listHelper.totalLikes(listWithManyBlogs)
    expect(result).toBe(36)
  })
})

describe('Most liked blog', () => {
  // Clone sample arrays
  const listWithOneBlog = [...sampleBlogs.listWithOneBlog]
  // const listWithManyBlogs = [...sampleBlogs.listWithManyBlogs]

  test('when list has only one blog, return that', () => {
    const result = listHelper.favoriteBlog(listWithOneBlog)

    expect(result).toEqual(listWithOneBlog[0])
  })
})
