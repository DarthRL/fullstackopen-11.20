const blogsRouter = require('express').Router()
const blog = require('../models/blog')
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.post('/', async (request, response, next) => {
  try {
    const body = request.body

    const user = request.user
    const blog = new Blog({
      ...body,
      user: user._id
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

  } catch (exception) {
    next(exception)
  }
})

blogsRouter.delete('/:id', async (request, response, next) => {
  try {
    const user = request.user
    const blog = await Blog.findById(request.params.id)
    if (!(user && user.id && blog.user.toString() === user.id)) {
      return response.status(401).json({ error: 'token invalid' })
    }
    blog.deleteOne()
    user.blogs = user.blogs.filter(blog => blog.toString() !== request.params.id)
    await user.save()
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
