/* eslint-disable arrow-body-style */
/* eslint-disable no-unused-vars */

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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
}
