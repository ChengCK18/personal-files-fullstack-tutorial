const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', (request, response) => {
    Blog
        .find({})
        .then(blogs => {
            console.log(response)
            response.json(blogs)
        })
})

blogsRouter.post('/', (request, response) => {
    console.log(request)
    const blog = new Blog(request.body)

    blog
        .save()
        .then(result => {
            response.status(201).json(result)
        })
})


module.exports = blogsRouter