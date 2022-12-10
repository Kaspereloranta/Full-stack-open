import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Footer from './components/Footer'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import Error from './components/Error'
import LoginForm from './components/Login'
import BlogForm from './components/Blogform'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)
  const [error, setError] = useState(null)
  const [loginVisible, setLoginVisible] = useState(false)

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
      const user = username
      //const user = await loginService.login({username, password})
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

  const loginForm = () => {
    const hideWhenVisible = { display: loginVisible ? 'none' : '' }
    const showWhenVisible = { display: loginVisible ? '' : 'none' }

    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={() => setLoginVisible(true)}>log in</button>
        </div>
        <div style={showWhenVisible}>
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
          <button onClick={() => setLoginVisible(false)}>cancel</button>
        </div>
      </div>
    )
  }

  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()
    blogService.setToken(user.token)
    blogService.create(blogObject).then(returnedBlog => {setBlogs(blogs.concat(returnedBlog))})
    setNotification(`New blog ${blogObject.title} by ${blogObject.author} created`)
    setTimeout(() => {setNotification(null)}, 3500)
  }

  const blogFormRef = useRef()

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
        <Togglable buttonLabel="new blog" ref = {blogFormRef}>
          <BlogForm createBlog={addBlog} />
        </Togglable> 
        {blogList()}
        </div>}
        <Footer />
    </div>
  )
}

export default App