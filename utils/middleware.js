var morgan = require('morgan');

morgan.token('jsonPost', (req, res) => {
    return req.method === 'POST' ?
    JSON.stringify(req.body) :
    null
})
const requestLogger = morgan(':date - :method :url :status :res[content-length] - :response-time ms :jsonPost')

const newUserError = (error, req, res, next) => {
    const user = req.body.user
    if (!user) {
        return res.status(400).send({'error': 'user data missing'})
    }
    next(error)
}

const internalServerError = (error, req, res, next) => {
    res.status(500).send({error: 'internal server error'})
}

const unknownEndpoint = (req, res) => {
    res.status(404).send({error: 'unknown endpoint'})
}

const errorHandler = (error, req, res, next) => {
    console.log(error)
    if (req.url === '/users' && req.method === 'POST') {
        return newUserError(error, req, res, next)
    }
    next(error)
}

module.exports = {
    requestLogger,
    internalServerError,
    unknownEndpoint,
    errorHandler
}
