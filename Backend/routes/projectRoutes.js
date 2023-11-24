const ProjectController = require('../controllers/projectController')
const ProjectRoutes = require('express').Router()
const authenticateToken = require('../middleware/auth.middleware')

ProjectRoutes.post('/', authenticateToken, ProjectController.addProject)
ProjectRoutes.put('/:projectId', authenticateToken, ProjectController.updateProject)
ProjectRoutes.delete('/:projectId', authenticateToken, ProjectController.deleteProject)


module.exports = ProjectRoutes