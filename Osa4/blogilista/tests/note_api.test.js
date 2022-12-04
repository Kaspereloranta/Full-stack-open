const mongoose = require('mongoose')
const supertest = require('supertest')
const { response } = require('../app')
const app = require('../app')
const api = supertest(app)
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const config = require('../utils/config')
const helper = require('./test_helper')
const bcrypt = require('bcrypt')
const User = require('../models/user')



beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})

describe('Blogtests', () => { 
  let token = null
  beforeAll(async() => {
    const passwordHash = await bcrypt.hash('12345', 10)
    const user = await new User({ username: 'name', passwordHash }).save()
    const userForToken = { username: 'name', id: user.id }
    return (token = jwt.sign(userForToken, config.SECRET))
  })

  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.initialBlogs.length)
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
      title: 'Testauksen alkeet',
      author: 'Kasper Eloranta',
      url: 'https://testataan.fi/',
      likes: 9,
    }
    
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', /application\/json/)
    
    const blogsAtend = await helper.blogsInDb()
    expect(blogsAtend).toHaveLength(helper.initialBlogs.length + 1)

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
      .set('Authorization', `Bearer ${token}`)

    const blogsAtend = await helper.blogsInDb()
    expect(blogsAtend).toHaveLength(helper.initialBlogs.length)
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
    
    const newBlog = {
      title: 'Testauksen alkeet',
      author: 'Kasper Eloranta',
      url: 'https://testataan.fi/',
      likes: 9,
    }
    
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', /application\/json/)
        
    const blogsAtStart = await helper.blogsInDb()
    const addedBlog = await blogsAtStart.find(blog => blog.title === 'Testauksen alkeet')

    await api
      .delete(`/api/blogs/${addedBlog.id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(204)
    
    const blogsAtEnd = await helper.blogsInDb()
    
    expect(blogsAtEnd).toHaveLength(
      helper.initialBlogs.length 
    )
    
    const contents = blogsAtEnd.map(r => r.title)
    
    expect(contents).not.toContain(addedBlog.content)
  })

  test('blogs include field id', async () => {
    const response = await api.get('/api/blogs')
    const blogs = response.body
    blogs.forEach(function (blog) {expect(blog.id).toBeDefined()})
  })


  test('a blog with undefiend likes will be added with 0 likes ', async () => {
    const newBlog = {
      title: 'Testauksen alkeet',
      author: 'Kasper Eloranta',
      url: 'https://testataan.fi/',
    }
    
    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
    
    const blogsAtEnd = await helper.blogsInDb()
    const addedBlog = await blogsAtEnd.find(blog => blog.title === 'Testauksen alkeet')
    expect(addedBlog.likes).toBe(0)

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

  })

  test('adding a blog without title or url to db responses 400 bad request', async() => {
    const newBlog = {
      author: 'Kasper Eloranta',
      likes: 9,
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
      .set('Authorization', `Bearer ${token}`)
    
    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)

  })

  test ('delete single blog', async() => {
    const testBlog = {
      title: 'Testauksen alkeet',
      author: 'Kasper Eloranta',
      url: 'https://testataan.fi/',
      likes: 9,
    }

    await api
      .post('/api/blogs')
      .send(testBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
      .set('Authorization', `Bearer ${token}`)
    
    const blogsAtBeginning = await helper.blogsInDb()

    const blogToDelete = blogsAtBeginning.filter(blog => blog.title == 'Testauksen alkeet')[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)
      .set('Authorization', `Bearer ${token}`)
    
    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)

    const contents = blogsAtEnd.map(r => r.title)
    expect(contents).not.toContain(blogToDelete.title)
    
  })

  test('update blog', async() => {
    const testBlog = {
      title: 'Testauksen alkeet',
      author: 'Kasper Eloranta',
      url: 'https://testataan.fi/',
      likes: 9,
    }
  
    await api
      .post('/api/blogs')
      .send(testBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
      .set('Authorization', `Bearer ${token}`)  

    const blogsAtBeginning = await helper.blogsInDb()
    const blogToUpdate = blogsAtBeginning.filter(blog => blog.title == testBlog.title)[0]

    const updatedBlog = {
      ...blogToUpdate,
      likes : blogToUpdate.likes + 1
    }

    await api
      .put(`/api/blogs/${updatedBlog.id}`)
      .send(updatedBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    const foundBlog = blogsAtEnd.filter(blog => blog.title == testBlog.title)[0]
    expect(foundBlog.likes).toBe(testBlog.likes +1)

  })

})

describe('when there is initially one user at db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })

  test('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'salainen',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('username must be unique')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })
  
  test('creation fails with proper statuscode and message if username shorter than 3 digits', async () => {
    const newUser = {
      username: 'as',
      name: 'kasper',
      password: 'salainen',
    }
    const usersAtStart = await helper.usersInDb()
    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('User validation failed: username: Path `username` (`as`) is shorter than the minimum allowed length (3).')
    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  test('creation fails with proper statuscode and message if username not given', async () => {
    const newUser = {
      name: 'kasper',
      password: 'salainen',
    }
    const usersAtStart = await helper.usersInDb()
    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('User validation failed: username: Path `username` is required.')
    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  test('creation fails with proper statuscode and message if password shorter than 3 digits', async () => {
    const newUser = {
      username: 'user',
      name: 'kasper',
      password: '12',
    }
    const usersAtStart = await helper.usersInDb()
    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('User validation failed: username: Path password is shorter than the minimum allowed length (3)')
    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  test('creation fails with proper statuscode and message if password not given', async () => {
    const newUser = {
      username: 'user',
      name: 'kasper',
    }
    const usersAtStart = await helper.usersInDb()
    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('User validation failed: Path password is required')
    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

})

afterAll(() => {
  mongoose.connection.close()
})