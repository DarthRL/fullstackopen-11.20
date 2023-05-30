const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body
  const users = await User.find({})
  const user = users[0]

  const blog = new Blog({
    ...body,
    user: user.id
  })
  if (blog.title && blog.url) {
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(blog._id)
    await user.save()
    response.status(201).json(savedBlog)
  }
  else {
    response.status(400).end()
  }
})

blogsRouter.delete('/:id', async (request, response, next) => {
  try {
    const result = await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } catch (exception) {
    next(exception)
  }
})

blogsRouter.put('/:id', async (request, response, next) => {
  try {
    const body = request.body
    const newBlog = {
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes
    }
    const result = await Blog.findByIdAndUpdate(request.params.id, newBlog, { new: true })
    response.json(result)
  } catch (exception) {
    next(exception)
  }
})

module.exports = blogsRouter
