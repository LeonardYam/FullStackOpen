const bcrypt = require('bcrypt')
const userRouter = require('express').Router()
const User = require('../models/user')

userRouter.get('', async (req, res) => {
    const users = await User.find({}).populate('blogs')
    res.status(200).json(users)
})

userRouter.post('', async (req, res) => {
    const {username, name, password} = req.body
    
    //Missing username or password
    if (!username || !password) {
        return res.status(400).send({error: "Missing username or password"})
    } else if (username.length < 3 || password.length < 3) {
        return res.status(400).send({error: "Username or password must be at least 3 characters!"})
    }

    const existingUser = await User.findOne({username})
    //Another user with same username exists
    if (existingUser) {
        return res.status(400).send({error: "Username must be unique!"})
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)
    
    const user = new User({
        username,
        name,
        passwordHash
    })

    const savedUser = await user.save()

    res.status(201).json(savedUser)
})

module.exports = userRouter