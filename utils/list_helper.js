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

module.exports = {
  dummy, totalLikes, favouriteBlog
}