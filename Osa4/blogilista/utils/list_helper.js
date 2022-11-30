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
    let Blogger = {
        'author': String,
        'blogs': Number 
    }
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
    Blogger.author = Blogg[0]
    Blogger.blogs = Blogg[1]

    return Blogger
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs
}
