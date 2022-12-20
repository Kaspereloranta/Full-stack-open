import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [blogTitle, setBlogTitle] = useState('')
  const [blogAuthor, setBlogAuthor] = useState('')
  const [blogUrl, setBlogUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: blogTitle,
      author: blogAuthor,
      url: blogUrl
    })
    setBlogTitle('')
    setBlogAuthor('')
    setBlogUrl('')
  }

  return (
    <div>
      <h2>Create a new blog</h2>
      <form onSubmit={addBlog}>
        <div>title: <input
          id="title"
          type="text"
          value={blogTitle}
          name="title"
          onChange={({ target }) => setBlogTitle(target.value)}
          placeholder='write blog title here'/>
        </div>
        <div>author: <input
          id="author"
          type="text"
          value={blogAuthor}
          name="author"
          onChange={({ target }) => setBlogAuthor(target.value)}/>
        </div>
        <div>url: <input
          id="url"
          type="text"
          value={blogUrl}
          name="url"
          onChange={({ target }) => setBlogUrl(target.value)}/>
        </div>
        <button id="submit-button" type="submit">save</button>
      </form>
    </div>
  )
}

export default BlogForm