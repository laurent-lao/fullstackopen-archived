/* eslint-disable arrow-body-style */
/* eslint-disable no-unused-vars */
const _ = require('lodash')
const array = require('lodash/array')
const object = require('lodash/fp/object')

const logger = require('./logger')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const reducer = (sum, item) => {
    return sum + item.likes
  }

  return blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
  if (!blogs || blogs.length === 0) return null

  const whichMostLike = (prevItem, currentItem) => {
    return currentItem.likes < prevItem.likes
      ? prevItem
      : currentItem
  }

  return blogs.reduce(whichMostLike)
}

const mostBlogs = (blogs) => {
  if (!blogs || blogs.length === 0) return null

  // Last Index has most blogs (uses lodash)
  const authorsByBlogCountObj = _.countBy(blogs, 'author')
  const authorsByBlogCountKeys = _.keys(authorsByBlogCountObj)
  const authorsByBlogCountValues = _.values(authorsByBlogCountObj)
  const lastIndex = authorsByBlogCountKeys.length - 1

  const mostBlogsInfo = {
    author: authorsByBlogCountKeys[lastIndex],
    blogs: authorsByBlogCountValues[lastIndex],
  }

  return mostBlogsInfo
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
}
