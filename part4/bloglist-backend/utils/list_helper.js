/* eslint-disable no-param-reassign */
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

  const mostLikedBlog = blogs.reduce(whichMostLike)

  const favoriteBlogInfo = {
    title: mostLikedBlog.title,
    author: mostLikedBlog.author,
    likes: mostLikedBlog.likes,
  }

  return favoriteBlogInfo
}

const mostBlogs = (blogs) => {
  if (!blogs || blogs.length === 0) return null

  // Count blogs per author
  const authorsByBlogCountObj = _.countBy(blogs, 'author')
  const authorsByBlogCountKeys = _.keys(authorsByBlogCountObj)
  const authorsByBlogCountValues = _.values(authorsByBlogCountObj)

  const whichMostBlog = (prevItem, currentItem) => {
    return currentItem < prevItem
      ? prevItem
      : currentItem
  }

  // Find mostBlogCount then use its index to find author
  const mostBlogCount = authorsByBlogCountValues.reduce(whichMostBlog)
  const mostBlogAuthor = authorsByBlogCountKeys[_.indexOf(
    authorsByBlogCountValues,
    mostBlogCount,
  )]

  const mostBlogsInfo = {
    author: mostBlogAuthor,
    blogs: mostBlogCount,
  }

  return mostBlogsInfo
}

const mostLikes = (blogs) => {
  if (!blogs || blogs.length === 0) return null

  const sumLikesPerAuthor = (sumArrayPerAuthor, currentItem) => {
    const { author, likes } = currentItem
    sumArrayPerAuthor[author] = sumArrayPerAuthor[author]
      ? sumArrayPerAuthor[author] + likes
      : likes
    return sumArrayPerAuthor
  }

  const whichMostLikes = (prevItem, currentItem) => {
    return currentItem < prevItem
      ? prevItem
      : currentItem
  }

  const totalLikesPerAuthor = blogs.reduce(sumLikesPerAuthor, {})
  const totalLikesPerAuthorKeys = _.keys(totalLikesPerAuthor)
  const totalLikesPerAuthorValues = _.values(totalLikesPerAuthor)

  const mostLikesTotal = totalLikesPerAuthorValues.reduce(whichMostLikes)
  const mostLikesAuthor = totalLikesPerAuthorKeys[_.indexOf(
    totalLikesPerAuthorValues,
    mostLikesTotal,
  )]

  const mostLikesInfo = {
    author: mostLikesAuthor,
    likes: mostLikesTotal,
  }

  return mostLikesInfo
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
}
