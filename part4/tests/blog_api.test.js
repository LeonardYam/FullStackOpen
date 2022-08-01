const mongoose = require('mongoose')
const supertest = require('supertest')
const Blog = require('../models/blog')
const User = require('../models/user')
const app = require('../app')

const api = supertest(app)

const baseUrl = '/api/blogs'
const userUrl = '/api/users'
const loginUrl = '/api/login'

const initialBlogs = [
    {
        title: "The Test",
        author: "Tester",
        url: "test.com",
        likes: 10,
    },
    {
        title: "The Build",
        author: "Bob",
        url: "build.com",
        likes: 5
    },
    {
        title: "The Trainer",
        author: "Ash",
        url: "pokemon.com",
        likes: 15
    }
]

const newBlog = {
    title: "The Apple",
    author: "Jobs",
    url: "apple.com",
    likes: 13
}

var token = null

beforeAll(async () => {
    //Add a user for token authentication
    await User.deleteMany({})
    const testUser = {
        username: "Tester",
        password: "pass",
        name: "Tester"
    }
    const userRes = await api.post(userUrl).send(testUser)
    const loginRes = await api.post(loginUrl).send(testUser)
    token = 'bearer ' + loginRes.body.token
    initialBlogs.forEach(b => b.creator = new mongoose.Types.ObjectId(userRes.body.id))
    console.log(initialBlogs)
})

beforeEach(async () => {
    //Empty the database
    await Blog.deleteMany({})

    const blogs = initialBlogs.map(b => new Blog(b))
    const promises = blogs.map(b => b.save())
    await Promise.all(promises)
})

test('get blog list has correct number of posts', async () => {
    const res = await api.get(baseUrl)
    expect(res.body).toHaveLength(initialBlogs.length)
})

test('check if list has correct id property', async () => {
    const res = await api.get(baseUrl)
    res.body.forEach((blog) => expect(blog.id).toBeDefined())
})

test('check if post request creates new blog', async () => {
    //Post new blog
    await api
        .post(baseUrl)
        .send(newBlog)
        .set('Authorization', token)
        .expect(201)
        .expect('Content-Type', 'application/json; charset=utf-8')

    const res = await api.get(baseUrl)

    expect(res.body).toHaveLength(initialBlogs.length + 1)
    const blogTitles = res.body.map(blog => blog.title)
    expect(blogTitles).toContain(newBlog.title)
})

test('check if likes property default to 0', async () => {
    const blogWithoutLikes = {
        title: "The Unlikable",
        author: "Mr Lonely",
        url: "sad.com"
    }

    //Post new blog
    await api
        .post(baseUrl)
        .send(blogWithoutLikes)
        .set('Authorization', token)
        .expect(201)
        .expect('Content-Type', 'application/json; charset=utf-8')

    const res = await api.get(baseUrl)
    const postedBlog = res.body.find(blog => blog.title === blogWithoutLikes.title)
    expect(postedBlog.likes).toBe(0)
})

test('check if invalid blog post is rejected', async () => {
    const badBlog = {
        author: 'The Bad Guy',
        likes: 0
    }

    await api
        .post(baseUrl)
        .send(badBlog)
        .set('Authorization', token)
        .expect(400)
})

test('check if blog posts can be deleted', async () => {
    const blogs = await api.get(baseUrl)
    //Delete first blog
    const blogToDelete = blogs.body.find(b => b.title === initialBlogs[0].title)

    await api
        .delete(`${baseUrl}/${blogToDelete.id}`)
        .set('Authorization', token)
        .expect(204)

    const blogsAfterDelete = await api.get(baseUrl)

    expect(blogsAfterDelete.body).toHaveLength(initialBlogs.length - 1)
})

test('check if blog posts can be updated', async () => {
    const initial = await api.get(baseUrl)

    const blogToUpdate = initial.body.find(b => b.title === initialBlogs[0].title)

    //Update first blog
    await api.patch(`${baseUrl}/${blogToUpdate.id}`)
        .set('Authorization', token)
        .send({ likes: blogToUpdate.likes + 1 })

    const updated = await api.get(baseUrl)
    const updatedBlog = updated.body.find(b => b.title === blogToUpdate.title)

    expect(updatedBlog.likes).toBe(blogToUpdate.likes + 1)
})

test('check if invalid token is rejected', async () => {
    await api.post(baseUrl)
            .send(newBlog)
            .expect(401)
})

afterAll(() => {
    mongoose.connection.close()
})