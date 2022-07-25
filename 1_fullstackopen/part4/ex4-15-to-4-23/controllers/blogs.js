const blogsRouter = require('express').Router()
const { json } = require('express')
const { request } = require('../app')
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
    const result = await Blog.find({})
    response.status(200).json(result)

})

blogsRouter.post('/', async (request, response) => {
    const blog = new Blog(request.body)

    try {
        const result = await blog.save()
        response.status(201).json(result)
    } catch (error) {
        response.status(400).json(error)
    }

})


blogsRouter.delete('/:id', async (request, response) => {
    const request_id = String(request.params.id)
    try {
        const result = await Blog.findByIdAndDelete(request_id)
        response.status(204).json(result)

    } catch (error) {
        response.status(400).json(error)

    }

})

blogsRouter.put('/:id', async (request, response) => {
    const request_id = String(request.params.id)
    const body = request.body

    // const updatedBlog = {
    //     title: body.title,
    //     author: body.author,
    //     url: body.url,
    //     likes: body.likes
    // }

    const updatedBlog = {
        ...(request.body.title === undefined ? {} : { title: request.body.title }),
        ...(request.body.author === undefined ? {} : { author: request.body.author }),
        ...(request.body.url === undefined ? {} : { url: request.body.url }),
        ...(request.body.likes === undefined ? {} : { likes: request.body.likes })
    }

    try {
        const result = await Blog.findByIdAndUpdate(request_id, updatedBlog, { new: true })
        response.status(200).json(result)
    } catch (error) {
        response.status(400).json(error)
    }

})



module.exports = blogsRouter