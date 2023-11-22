const EmailController = require('../controllers/emailController')
const authenticateToken = require('../middleware/auth.middleware')
const EmailRoutes = require('express').Router()

EmailRoutes.post('/', authenticateToken, EmailController.send)

module.exports = EmailRoutes