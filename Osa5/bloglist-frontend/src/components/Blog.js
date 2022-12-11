import React, {useState} from 'react'
import blogService from '../services/blogs'

const Blog = ({blog, toggleImportance, blogList, setBlogs}) => {

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
    blogService.update(blog.id, blogObject).then(updatedBlog => {
      setBlogs(blogs.map(x => x.id === blog.id ? updatedBlog : x))
    })
  }

  return (
  <li className="blog" style={blogStyle}>
    {blog.title} by {blog.author} <button onClick={handleClick}>{showDetails ? 'hide' : 'view'}</button>
    <div style={showWhenVisible}>
      <p>{blog.url}</p>
      <p>Likes {blog.likes} <button onClick={like}>like</button></p>
      <p>{blog.user.name}</p>
    </div>
  </li>
)}

export default Blog