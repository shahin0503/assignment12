const CommentController = require('../controllers/commentController');
const CommentRoutes = require('express').Router();
const authenticateToken = require('../middleware/auth.middleware')

// comments
CommentRoutes.post('/', authenticateToken, CommentController.addComment)
CommentRoutes.put('/:commentId', authenticateToken, CommentController.editComment)
CommentRoutes.delete('/:commentId', authenticateToken, CommentController.deleteComment)

module.exports = CommentRoutes