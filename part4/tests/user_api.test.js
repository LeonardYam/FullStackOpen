const mongoose = require('mongoose')
const app = require('../app')
const supertest = require('supertest')
const User = require('../models/user')

const api = supertest(app)

const baseUrl = '/api/users'

const initialUsers = [
    {
        username: "Adam",
        passwordHash: "abc123",
        name: "A.dam"
    },
    {
        username: "Eve",
        passwordHash: "asdf000",
        name: "E.ve"
    }
]

beforeEach(async () => {
    await User.deleteMany({})
    const userDocuments = initialUsers.map(u => new User(u))
    const promises = userDocuments.map(u => u.save())
    await Promise.all(promises)
})

describe('check if invalid user creations are rejected', () => {
    test('missing username is rejected', async () => {
        const missingUsername = {
            password: "pass123",
            name: "missingUser"
        }

        await api
            .post(baseUrl)
            .send(missingUsername)
            .expect(400)
    })

    test('missing password is rejected', async () => {
        const missingPassword = {
            username: "mP",
            name: "missingPassword"
        }

        await api
            .post(baseUrl)
            .send(missingPassword)
            .expect(400)
    })

    test('username shorter than 3 characters is rejected', async () => {
        const shortUsername = {
            username: "S",
            password: "abc123",
            name: "shortUsername"
        }

        await api
            .post(baseUrl)
            .send(shortUsername)
            .expect(400)
    })

    test('password shorter than 3 characters is rejected', async () => {
        const shortPassword = {
            username: "Short",
            password: "sP",
            name: "shortPassword"
        }

        await api
            .post(baseUrl)
            .send(shortPassword)
            .expect(400)
    })

    test('non-unique username is rejected', async () => {
        const duplicateUsername = {
            username: initialUsers[0].username,
            password: "test000",
            name: "duplicateUsername"
        }

        await api
            .post(baseUrl)
            .send(duplicateUsername)
            .expect(400)
    })
})

afterAll(() => 
    mongoose.connection.close()
)