import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Footer from './components/Footer'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import Error from './components/Error'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [blogTitle, setBlogTitle] = useState('')
  const [blogAuthor, setBlogAuthor] = useState('')
  const [blogUrl, setBlogUrl] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)
  const [error, setError] = useState(null)


  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('logged user')
    if (loggedUser) {
      const user = JSON.parse(loggedUser)
      setUser(user)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)
    try {
      //const user = username
      const user = await loginService.login({username, password})
      setUser(user)
      setUsername('')
      setPassword('')
      blogService.setToken(user.token)
      window.localStorage.setItem('logged user', JSON.stringify(user))
      setNotification(`${username} logged`)
      setTimeout(() => {setNotification(null)}, 5000)
    } catch (exception) {
      setError('Wrong username or password')
      setTimeout(() => {setError(null)}, 5000)
    }
  }

  const handleClick = (event) => {
    event.preventDefault()
    setNotification(`${user.username} logged out`)
    setTimeout(() => {setNotification(null)}, 3500)
    setUser(null)
    window.localStorage.clear()
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
        <div>
        <h1>log in to application</h1>
          username
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({target}) => setUsername(target.value)} />
        </div>
        <div>
          password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({target}) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
  )

  const blogForm = () => (
    <form onSubmit={addBlog}>
      <h2>Create a new blog</h2>

      <div>title: <input
      type="text"
      value={blogTitle}
      name="title"
      onChange={({target}) => setBlogTitle(target.value)}
      /></div>

      <div>author: <input
      type="text"
      value={blogAuthor}
      name="author"
      onChange={({target}) => setBlogAuthor(target.value)}
      /></div>

      <div>url: <input
      type="text"
      value={blogUrl}
      name="url"
      onChange={({target}) => setBlogUrl(target.value)}
      /></div>

      <button type="submit">save blog</button>

    </form>
  )

  const addBlog = (event) => {
    event.preventDefault()
    const newBlog = {
      title: blogTitle,
      author: blogAuthor,
      url: blogUrl
    }
    console.log(newBlog)
    blogService.setToken(user.token)
    blogService.create(newBlog).then(returnedBlog => {setBlogs(blogs.concat(returnedBlog))})
    setNotification(`New blog ${newBlog.title} by ${newBlog.author} created`)
    setTimeout(() => {setNotification(null)}, 3500)
  }


  const blogList = () => (
    <div>
      <h2>Blog list</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )

  return (
    <div>
      <Notification message={notification}></Notification>
      <Error message={error}> </Error>
      
      {user === null 
      ? loginForm()
      : 
      <div>
        <h1>Blogs</h1>
        <p>{user.name} logged in <button type="button" onClick={handleClick}>logout</button> </p>
        {blogForm()}
        {blogList()}
        </div>}
        <Footer />
    </div>
  )
}

export default App