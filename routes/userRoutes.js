const userController = require('../controllers/userController')
const UserRoutes = require('express').Router()
const authenticateToken = require('../middleware/auth.middleware');

UserRoutes.post('/signup', userController.signup)
UserRoutes.post('/signIn', userController.signIn)
UserRoutes.put('/', authenticateToken, userController.updateUser)
UserRoutes.get('/', userController.listUsers)
UserRoutes.get('/:userId', userController.getUserDetails)

module.exports = UserRoutes 