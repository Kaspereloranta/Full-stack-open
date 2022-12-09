
const Blog = ({ blog, toggleImportance }) => {
  const label = blog.important
    ? 'make not important' : 'make important'

  return (
    <li className="blog">
       {blog.title} by {blog.author}
    </li>
  )
}

export default Blog