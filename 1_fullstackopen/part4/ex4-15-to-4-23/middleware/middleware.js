const User = require('../models/user')
const jwt = require('jsonwebtoken')

const tokenExtractor = (request, response, next) => {
    const authorization = request.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        request.token = authorization.substring(7) //return the token's string
    }
    next()
}



const userExtractor = async (request, response, next) => {

    const token = request.token
    let decodedToken = null

    try {
        decodedToken = jwt.verify(token, process.env.SECRET)
    } catch (error) {
        console.log('error11')
        return response.status(401).json({ error: 'Invalid or missing token' })
    }

    if (!decodedToken.id) {
        console.log('error22')
        return response.status(401).json({ error: 'Invalid or missing token' })
    }

    request.user = await User.findById(decodedToken.id)

    next()
}


module.exports = { tokenExtractor, userExtractor }