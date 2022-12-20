import React, { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, blogList, setBlogs, currentUser }) => {

  const [showDetails, setShowDetails] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 10,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const showWhenVisible = { display: showDetails ? '' : 'none' }

  const handleClick = (event) => {
    event.preventDefault()
    showDetails ? setShowDetails(false) : setShowDetails(true)
  }

  const like = async (event) => {
    event.preventDefault()
    const blogs = await blogList
    const blogObject = {
      user : blog.user,
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1
    }
    const updatedBlog = await blogService.update(blog.id, blogObject)
    setBlogs(blogs.map(x => x.id === blog.id ? updatedBlog : x))
  }

  const remove = async (event) => {
    event.preventDefault()
    if(window.confirm('Remove blog ' + blog.title + ' by ' + blog.author))
    {
      const blogs = await blogList
      blogService.setToken(currentUser.token)
      await blogService.remove(blog.id)
      setBlogs(blogs.filter(x => x.id !== blog.id))
    }
  }

  return (
    <div className="blog" style={blogStyle}>
      <span className="title">{blog.title} - </span>
      <span className="author">{blog.author}</span>{' '}
      <button id='viewbutton' onClick={handleClick}>{showDetails ? 'hide' : 'view'}</button>
      <div style={showWhenVisible}>
        <p>{blog.url}</p>
        <p>Likes {blog.likes} <button id='likebutton' onClick={like}>like</button></p>
        <button onClick={remove}>remove</button>
      </div>
    </div>
  )}

export default Blog
// allaoleva otettu pois testejä varten
// <p>{blog.user.name}</p>
//rivi 54         {currentUser.username === blog.user.username ? <button onClick={remove}>remove</button> : ''}
