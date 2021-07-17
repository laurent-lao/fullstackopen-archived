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

describe('most liked blog', () => {
  // Clone sample arrays
  const listWithNoBlogs = [...sampleBlogs.listWithNoBlogs]
  const listWithOneBlog = [...sampleBlogs.listWithOneBlog]
  const listWithManyBlogs = [...sampleBlogs.listWithManyBlogs]

  test('when list is empty, return null', () => {
    const result = listHelper.favoriteBlog(listWithNoBlogs)
    expect(result).toBe(null)
  })

  test('when list has only one blog, return that', () => {
    const result = listHelper.favoriteBlog(listWithOneBlog)
    expect(result).toEqual(listWithOneBlog[0])
  })

  test('when list has many blogs, return most liked', () => {
    const result = listHelper.favoriteBlog(listWithManyBlogs)
    expect(result).toEqual(listWithManyBlogs[2])
  })
})

describe('author with most blogs', () => {
  // Clone sample arrays
  const listWithNoblogs = [...sampleBlogs.listWithNoBlogs]
  const listWithOneBlog = [...sampleBlogs.listWithOneBlog]

  test('when list is empty, return null', () => {
    const result = listHelper.mostBlogs(listWithNoblogs)
    expect(result).toBe(null)
  })
  test('when list has only one blog, return that one\'s information', () => {
    const result = listHelper.mostBlogs(listWithOneBlog)
    expect(result).toEqual({
      author: 'Edsger W. Dijkstra',
      blogs: 1,
    })
  })

  test('when list has many blogs, return most prolific info', () => {
    const result = listHelper.mostBlogs(sampleBlogs.listWithManyBlogs)
    expect(result).toEqual({
      author: 'Robert C. Martin',
      blogs: 3,
    })
  })
})
