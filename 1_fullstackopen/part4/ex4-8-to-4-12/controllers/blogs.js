const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
    const getAllBlog = await Blog.find({})
    response.status(200).json(getAllBlog)

})

blogsRouter.post('/', async (request, response) => {
    const blog = new Blog(request.body)

    try {
        const savedBlog = await blog.save()
        response.status(201).json(savedBlog)
    } catch (error) {
        response.status(400).json(error)
    }





})


module.exports = blogsRouter