const userRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')


userRouter.get('/', async (request, response) => {
    const result = await User.find({})
    response.status(200).json(result)

})

userRouter.post('/', async (request, response) => {
    console.log(request.body)

    const { username, name, password } = request.body

    const saltRounds = 10
    console.log('Ze password ', password, username, name)
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User({
        username,
        name,
        passwordHash
    })

    const savedUser = user.save()


    response.status(201).json(savedUser)


})




module.exports = userRouter