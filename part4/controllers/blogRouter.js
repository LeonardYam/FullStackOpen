const blogRouter = require('express').Router()
const { userExtractor } = require('../utils/middleware')
const Blog = require('../models/blog')

blogRouter.get('', async (req, res) => {
    const blogs = await Blog
        .find({}).populate('creator')
    res.json(blogs)
})

blogRouter.post('', userExtractor, async (req, res) => {
    //Missing title or url property
    if (!req.body.title || !req.body.url) {
        return res.status(400).send({ error: "Missing properties!" })
    }
    const user = req.user
    const blog = new Blog({ ...req.body, creator: user._id })
    const result = await blog.save()
    user.blogs = user.blogs.concat(result._id)
    await user.save()

    res.status(201).json(await result.populate('creator'))
})

blogRouter.delete('/:id', userExtractor, async (req, res) => {
    const user = req.user
    const blog = await Blog.findById(req.params.id)
    if (blog.creator.toString() === user.id) {
        await Blog.deleteOne(blog)
        user.blogs = user.blogs.filter(b => b.toString() !== req.params.id)
        await user.save()
        res.status(204).end()
    } else {
        res.status(400).send({error: "Non-creators can't delete blog post!"})
    }
})

blogRouter.patch('/:id', async (req, res) => {
    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, { ...req.body }, {new: true}).populate('creator')
    res.json(updatedBlog)
})

module.exports = blogRouter