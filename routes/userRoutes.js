const userController = require('../controllers/userController')
const UserRoutes = require('express').Router()
const authenticateToken = require('../middleware/auth.middleware');

UserRoutes.post('/signup', userController.signup)
UserRoutes.post('/signIn', userController.signIn)
UserRoutes.put('/', authenticateToken, userController.updateUser)
UserRoutes.get('/', authenticateToken, userController.listUsers)
UserRoutes.get('/:userId', authenticateToken, userController.getUserDetails)
UserRoutes.get('/:userId/projects', authenticateToken, userController.getProjectsForAUser)

module.exports = UserRoutes 