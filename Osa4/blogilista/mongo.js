const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const mongoUrl =
  `mongodb+srv://fullstack:${password}@cluster0.o1opl.mongodb.net/blogList?retryWrites=true&w=majority`

mongoose.connect(mongoUrl)

const blogSchema = mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number
})

blogSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })

const Blog = mongoose.model('Blog', blogSchema)

const blog = new Blog({
  title: "Blogi",
  author: "Blogaaja",
  url: "www.blogi.fi",
  likes: 9000
})

/*
Blog.find({important:true}).then(result => {
    result.forEach(blog => {
      console.log(blog)
    })
    mongoose.connection.close()
  })
*/

blog.save().then(result => {
  console.log('blog saved!')
  console.log(result)
  mongoose.connection.close()
})
