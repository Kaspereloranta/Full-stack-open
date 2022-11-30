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

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}
