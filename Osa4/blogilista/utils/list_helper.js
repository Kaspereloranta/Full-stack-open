const lodash = require('../node_modules/lodash')

const dummy = (blogs) => {
  let a = 1
  return a
}
 
const totalLikes = (blogs) => {
  var totalLikes = blogs.reduce(function(sum,blog) {
    return sum + blog.likes
  }, 0)
  return totalLikes
}

const favoriteBlog = (blogs) => {
  const favoriteBlog = blogs.reduce(function(prev,current){
    return (prev.likes > current.likes ? prev : current)
  })
  console.log(favoriteBlog)
  return favoriteBlog
}

const mostBlogs = (blogs) => {

  const author = (blog) => {
    return blog.author
  }
  const groupedBlogs = lodash.groupBy(blogs,author)
  Object.keys(groupedBlogs).forEach(function(key){
    groupedBlogs[key] = groupedBlogs[key].length
  })

  const groupedBlogsArray = Object.entries(groupedBlogs)
  const Blogg = groupedBlogsArray.reduce(function(prev, current) {
    return (prev[1] > current[1]) ? prev : current
  })

  let Blogger = {
    'author': Blogg[0],
    'blogs': Blogg[1] 
  }

  return Blogger
}

const mostLikes = (blogs) => {

  const author = (blog) => {
    return blog.author
  }
  const groupedBlogs = lodash.groupBy(blogs,author)

  Object.keys(groupedBlogs).forEach(function(key){
    groupedBlogs[key] = totalLikes(groupedBlogs[key])
  })

  const groupedBlogsArray = Object.entries(groupedBlogs)
  const Blogg = groupedBlogsArray.reduce(function(prev, current) {
    return (prev[1] > current[1]) ? prev : current
  })

  let Blogger = {
    'author': Blogg[0],
    'likes': Blogg[1] 
  }
  return Blogger
}


module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}
