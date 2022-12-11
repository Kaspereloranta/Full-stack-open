import React, {useState} from 'react'

const Blog = ({blog, toggleImportance}) => {

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

  return (
  <li className="blog" style={blogStyle}>
    {blog.title} by {blog.author} <button onClick={handleClick}>{showDetails ? 'hide' : 'view'}</button>
    <div style={showWhenVisible}>
      <p>{blog.url}</p>
      <p>Likes {blog.likes} <button>like</button></p>
      <p>{blog.user.name}</p>
    </div>
  </li>
)}

export default Blog