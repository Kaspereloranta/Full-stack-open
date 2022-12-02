
const listHelper = require('../utils/list_helper')
const helper = require('./test_helper')


describe('dummy and totalLikes',() => {
  test('dummy returns one', () => {
    const blogs = []
    const result = listHelper.dummy(blogs)
    expect(result).toBe(1)
  })
    
  test('totalLikes returns total likes', () => {

    var totalLikes = helper.blogs.reduce(function(sum,blog) {return sum + blog.likes}, 0)
    const result = listHelper.totalLikes(helper.blogs)
    expect(result).toBe(totalLikes)
  })
})

describe('favorite blog tests',() => {
  test('favoriteBlogs returns the blog with most likes ', () => {
    const favoriteBlog = helper.blogs.reduce(function(prev,current){
      return (prev.likes > current.likes ? prev : current)
    })
        
    const result = listHelper.favoriteBlog(helper.blogs)
    expect(result).toEqual(favoriteBlog)
  })
})

describe('most blog tests',() => {
  test('mostBlogs returns the author with most blogs', () => {
        
    let Blogger = {
      'author': 'Robert C. Martin',
      'blogs': 3 
    }

    const result = listHelper.mostBlogs(helper.blogs)
    expect(result).toEqual(Blogger)
  })
})

describe('most likes tests',() => {
  test('mostLikes returns the author with most likes', () => {
        
    let Blogger = {
      'author': 'Edsger W. Dijkstra',
      'likes': 17
    }

    const result = listHelper.mostLikes(helper.blogs)
    expect(result).toEqual(Blogger)
  })
})