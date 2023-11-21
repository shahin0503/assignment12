const BlogController = require('../controllers/blogController')
const BlogRoutes = require('express').Router()
const authenticateToken = require('../middleware/auth.middleware');

// Blogs
BlogRoutes.get('/', BlogController.getAllBlogs);
BlogRoutes.get('/:blogId', BlogController.getBlogDetails)
BlogRoutes.post('/', authenticateToken, BlogController.createBlog);
BlogRoutes.put('/:blogId', authenticateToken, BlogController.updateBlog)
BlogRoutes.delete('/:blogId', authenticateToken, BlogController.deleteBlog)


module.exports = BlogRoutes;