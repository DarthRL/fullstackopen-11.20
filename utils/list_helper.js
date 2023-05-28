const _ = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const reducer = (sum, item) => {
    return sum + item.likes
  }

  return blogs.length === 0
    ? 0
    : blogs.reduce(reducer, 0)
}

const favouriteBlog = (blogs) => {
  const reducer = (max, item) => {
    return max.likes < item.likes 
      ? {
        title: item.title, 
        author: item.author,
        likes: item.likes
      }
      : max
  }

  return blogs.length === 0
    ? {}
    : blogs.reduce(reducer, {likes: 0})
}

const mostBlogs = (blogs) => {
  const counted = _.countBy(blogs, 'author')
  const most = _.sortBy(Object.entries(counted), 1).at(-1)
  return blogs.length === 0
    ? {}
    : {author:most[0], blogs:most[1]}
}

module.exports = {
  dummy, totalLikes, favouriteBlog, mostBlogs
}