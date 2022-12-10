import { useState } from 'react' 
import Notification from './Notification'
import Error from './Error'

const BlogForm = ({ createBlog }) => {
    const [blogTitle, setBlogTitle] = useState('')
    const [blogAuthor, setBlogAuthor] = useState('')
    const [blogUrl, setBlogUrl] = useState('')
    const [notification, setNotification] = useState(null)
    const [error, setError] = useState(null)
    
    const addBlog = (event) => {
        console.log(blogTitle,blogAuthor,blogUrl)
        event.preventDefault()
        createBlog({
            title: blogTitle,
            author: blogAuthor,
            url: blogUrl
        })
        blogService.setToken(user.token)
        blogService.create(newBlog).then(returnedBlog => {setBlogs(blogs.concat(returnedBlog))})
        setBlogTitle('')
        setBlogAuthor('')
        setBlogUrl('')
      }

    return (
      <div>
        <h2>Create a new blog</h2>
        <form onSubmit={addBlog}>
            <div>title: <input
                type="text"
                value={blogTitle}
                name="title"
                onChange={({target}) => setBlogTitle(target.value)}/>
            </div>
            <div>author: <input
                type="text"
                value={blogAuthor}
                name="author"
                onChange={({target}) => setBlogAuthor(target.value)}/>
            </div>
            <div>url: <input
                type="text"
                value={blogUrl}
                name="url"
                onChange={({target}) => setBlogUrl(target.value)}/>
            </div>
          <button type="submit">save</button>
        </form>
      </div>
    )
}
  
export default BlogForm