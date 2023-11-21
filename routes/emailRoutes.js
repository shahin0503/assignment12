const EmailController = require('../controllers/emailController')
const EmailRoutes = require('express').Router()

EmailRoutes.post('/', EmailController.send)

module.exports = EmailRoutes