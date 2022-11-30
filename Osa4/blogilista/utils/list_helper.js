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

module.exports = {
    dummy,
    totalLikes
}
