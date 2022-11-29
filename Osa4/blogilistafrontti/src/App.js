import { useState, useEffect } from 'react'
import blogService from './services/blogs'
import Notification from './components/Notification'
import Error from './components/Error'


const Number=(props) => {
   if((props.blog.title).toLowerCase().includes(props.filter.toLowerCase())){
    return(
      <p >{props.blog.title} {props.blog.author} {props.blog.url} {props.blog.likes}   
         <button  onClick={props.deleteBlog(props.blog.id)}> delete </button> </p>
    ) 
   }
}

const Numbers=(props) => {
  return(
    <ul> 
    {props.blogs.map(blog => 
          <Number key={blog.id} blog={blog} filter={props.filter} 
           deleteBlog={props.deleteBlog}></Number>)}
    </ul>  
  )
}

const BlogForm=(props) => {
  return(
    <form onSubmit={props.addNumber}>
            <div>
              name: <input value={props.newName} onChange={props.handleNameChange}  />
            </div>
            <div>author: <input value={props.newNumber} onChange={props.handleNumberChange}/></div>
            <div>URL: <input value={props.newUrl} onChange={props.handleUrlChange}/></div>
            <div>Likes: <input value={props.newLikes} onChange={props.handleLikesChange}/></div>

            <div>
              <button type="submit">add</button>
            </div>
          </form>
  )
}

const FilterForm=(props) => {
  return(
    <div>filter shown with <input value={props.filter} onChange={props.handleFilter}></input></div>
  )
}

const App = () => {
  
  const [blogs, setBlogs] = useState([])
    
  useEffect(() => {
    console.log('effect')
    blogService
      .getAll()
      .then(response=>{
        setBlogs(response.data)
      })
  }, [])

  const [newName, setNewName] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')
  const [newLikes, setNewLikes] = useState('')
  const [filter, setFilter] = useState('')
  const [notification, setNotification] = useState(null)
  const [error, setError] = useState(null)


  const addNumber = (event) => {
    event.preventDefault()
    const BlogObject = {
      title: newName,
      author: newAuthor,
      url: newUrl,
      likes: newLikes
    }

    if((blogs.map(blog => blog.title)).includes(newName)){
      if(window.confirm(newName + " is already added to phonebook, replace the old number with a new one?")){
        const updateBlog = {
          title: newName,
          author: newAuthor,
          id: blogs.find(blog => blog.title === newName).id
        } 
        console.log(updateBlog)
        blogService
        .update(updateBlog.id, updateBlog)
        .then(response => {
          console.log(response.data)
          setBlogs(blogs.map(blog => blog.id !== updateBlog.id ? blog : response.data) )
          setNotification("Edited " + blogs.find(blog => blog.id === updateBlog.id).title + "'s number")
          setNewName('')
          setNewAuthor('')   
          setTimeout(()=>{
            setNotification(null)
          },5000)
        })
        .catch(error=>{
          setError("Information of " + blogs.find(blog => blog.id === updateBlog.id).title + " has already been removed from server")
          setTimeout(()=>{
            setError(null)
          },5000)
          setNewName('')
          setNewAuthor('')   
        }) 
      }
    }
       
    else{
      blogService
      .create(BlogObject)
      .then(response => {
        setBlogs(blogs.concat(response.data))
        setNotification("Added " + BlogObject.title)
      })
      .catch(error=>{
        setError(error.response.data.error)
        setTimeout(()=>{
          setError(null)
        },5000)
      })
      setNewName('')
      setNewAuthor('')   
      setTimeout(()=>{
        setNotification(null)
      },5000)
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewAuthor(event.target.value)
  }

  const handleUrlChange = (event) => {
    setNewUrl(event.target.value)
    console.log(newUrl)
  }

  const handleLikesChange = (event) => {
    setNewLikes(event.target.value)
    console.log(newLikes)
  }

  const handleFilter = (event) => {
    setFilter(event.target.value)

  }
  
  const deleteBlog = (id) =>{
    const deleter = () => {
        if (window.confirm("Delete " + blogs.find(blog => blog.id === id).title + "?")){      
          blogService
            .erase(id)
            .then(response => {
              setBlogs(blogs.filter(blog => blog.id !== id))
              setNotification("Deleted " + blogs.find(blog => blog.id === id).title)
              setTimeout(()=>{
                setNotification(null)
              },5000)
            })
            .catch(error=>{
              setError("Information of " + blogs.find(blog => blog.id === id).title + " has already been removed from server")
              setTimeout(()=>{
                setError(null)
              },5000)
              setNewName('')
              setNewAuthor('')   
            }) 
         }
    }
    
    return deleter  
  }

  return (
    <div>
      <h1>Bloglist</h1>
      <Notification message={notification}></Notification>
      <Error message={error}> </Error>

      <FilterForm filter={filter} handleFilter={handleFilter}></FilterForm>
      
      <BlogForm newName={newName} newAuthor={newAuthor} newUrl={newUrl} newLikes={newLikes}
      handleNameChange={handleNameChange} handleNumberChange={handleNumberChange}
      handleUrlChange={handleUrlChange} handleLikesChange={handleLikesChange}
      addNumber={addNumber}></BlogForm>
     
      <h1>Blogs</h1>    
      <Numbers blogs={blogs} filter={filter} deleteBlog={deleteBlog}></Numbers>
    </div>
  )

}

export default App
