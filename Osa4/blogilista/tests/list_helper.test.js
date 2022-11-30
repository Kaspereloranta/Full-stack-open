
const listHelper = require('../utils/list_helper')

const blogs = [
    {
        _id: '5a422a851b54a676234d17f7',
        title: 'React patterns',
        author: 'Michael Chan',
        url: 'https://reactpatterns.com/',
        likes: 7,
        __v: 0
    },
    {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0
    },
    {
        _id: '5a422b3a1b54a676234d17f9',
        title: 'Canonical string reduction',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
        likes: 12,
        __v: 0
    },
    {
        _id: '5a422b891b54a676234d17fa',
        title: 'First class tests',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
        likes: 10,
        __v: 0
    },
    {
        _id: '5a422ba71b54a676234d17fb',
        title: 'TDD harms architecture',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
        likes: 0,
        __v: 0
    },
    {
        _id: '5a422bc61b54a676234d17fc',
        title: 'Type wars',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
        likes: 2,
        __v: 0
    }
]

describe('dummy and totalLikes',() => {
    test('dummy returns one', () => {
        const blogs = []
        const result = listHelper.dummy(blogs)
        expect(result).toBe(1)
    })
    
    test('totalLikes returns total likes', () => {

        var totalLikes = blogs.reduce(function(sum,blog) {return sum + blog.likes}, 0)
        const result = listHelper.totalLikes(blogs)
        expect(result).toBe(totalLikes)
    })
})

describe('favorite blog tests',() => {
    test('favoriteBlogs returns the blog with most likes ', () => {
        const favoriteBlog = blogs.reduce(function(prev,current){
            return (prev.likes > current.likes ? prev : current)
        })
        
        const result = listHelper.favoriteBlog(blogs)
        expect(result).toEqual(favoriteBlog)
    })
})

describe('most blog tests',() => {
    test('mostBlogs returns the author with most blogs', () => {
        
        let Blogger = {
            'author': 'Robert C. Martin',
            'blogs': 3 
        }

        const result = listHelper.mostBlogs(blogs)
        expect(result).toEqual(Blogger)
    })
})

describe('most likes tests',() => {
    test('mostLikes returns the author with most likes', () => {
        
        let Blogger = {
            'author': 'Edsger W. Dijkstra',
            'likes': 17
        }

        const result = listHelper.mostLikes(blogs)
        expect(result).toEqual(Blogger)
    })
})