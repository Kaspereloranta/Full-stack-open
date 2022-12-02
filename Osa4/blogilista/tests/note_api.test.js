const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const helper = require('./test_helper')

beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.blogs)
})

test('blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.blogs.length)
})
  
test('a specific blog is within the returned blogs', async () => {
    const response = await api.get('/api/blogs')
  
    const contents = response.body.map(r => r.title)
  
    expect(contents).toContain(
        'React patterns'
    )
})


test('a valid blog can be added ', async () => {
    const newBlog = {
        _id: '5a422a851b54a676234d17e1',
        title: 'Testauksen alkeet',
        author: 'Kasper Eloranta',
        url: 'https://testataan.fi/',
        likes: 9,
        __v: 0
    }
  
    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(200)
        .expect('Content-Type', /application\/json/)
  
    const blogsAtend = await helper.blogsInDb()
    expect(blogsAtend).toHaveLength(helper.blogs.length + 1)

    const contents = blogsAtend.map(n => n.title)
    expect(contents).toContain(
        'Testauksen alkeet'
    )
  })

test('blog without author is not added', async () => {
    const newBlog = {
        title: 'Testauksen perusteet'
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)

    const blogsAtend = await helper.blogsInDb()

    expect(blogsAtend).toHaveLength(helper.blogs.length)
})

test('a specific blog can be viewed', async () => {
    const blogsAtStart = await helper.blogsInDb()
  
    const blogToView = blogsAtStart[0]
  
    const resultBlog = await api
        .get(`/api/blogs/${blogToView.id}`)
        .expect(200)
        .expect('Content-Type', /application\/json/)
  
    const processedBlogToView = JSON.parse(JSON.stringify(blogToView))
  
    expect(resultBlog.body).toEqual(processedBlogToView)
})
  
test('a blog can be deleted', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]
  
    await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .expect(204)
  
    const blogsAtEnd = await helper.blogsInDb()
  
    expect(blogsAtEnd).toHaveLength(
        helper.blogs.length - 1
    )
  
    const contents = blogsAtEnd.map(r => r.title)
  
    expect(contents).not.toContain(blogToDelete.content)
})

afterAll(() => {
    mongoose.connection.close()
})