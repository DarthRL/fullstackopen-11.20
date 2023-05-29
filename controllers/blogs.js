const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body)
  if (blog.title && blog.url) {
    const savedBlog = await blog.save()
    response.status(201).json(savedBlog)
  }
  else {
    response.status(400).end()
  }
})

blogsRouter.delete('/:id', async (request, response) => {
  try {
    const result = await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } catch(exception) {
    next(exception)
  }
})

module.exports = blogsRouter
