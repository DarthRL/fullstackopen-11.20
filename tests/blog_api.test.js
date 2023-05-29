const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const Blog = require('../models/blog')
const app = require('../app')
mongoose.set("bufferTimeoutMS", 30000)

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  const noteObjects = helper.initialBlogs
    .map(blog => new Blog(blog))
  const promiseArray = noteObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
}, 100000)

test('notes are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
}, 100000)

test('identifier is named "id"', async () => {
  const blogs = await api.get('/api/blogs')
  blogs.body.forEach(blog => {
    expect(blog.id).toBeDefined()
  })
}, 100000)

test('a valid blog can be added', async () => {
  const newBlog = {
    title: "new blog",
    author: "new author",
    url: "new url",
    likes: 10
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')

  const blogs = response.body.map(r => ({
    title: r.title,
    author: r.author,
    url: r.url,
    likes: r.likes
  }))

  expect(response.body).toHaveLength(helper.initialBlogs.length + 1)
  expect(blogs).toContainEqual(newBlog)
}, 100000)

test('missing "likes" defaults to 0', async () => {
  const newBlog = {
    title: "new blog",
    author: "new author",
    url: "new url"
  }
  const newBlogWithLikes = {
    ...newBlog,
    likes: 0
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')

  const blogs = response.body.map(r => ({
    title: r.title,
    author: r.author,
    url: r.url,
    likes: r.likes
  }))

  expect(response.body).toHaveLength(helper.initialBlogs.length + 1)
  expect(blogs).toContainEqual(newBlogWithLikes)
}, 100000)

test('missing title or url returns 400', async () => {
  const newBlog1 = {
    author: "new author",
    url: "new url"
  }
  const newBlog2 = {
    title: "new title",
    author: "new author"
  }

  await api
    .post('/api/blogs')
    .send(newBlog1)
    .expect(400)

  await api
    .post('/api/blogs')
    .send(newBlog2)
    .expect(400)
}, 100000)

afterAll(async () => {
  await mongoose.connection.close()
})