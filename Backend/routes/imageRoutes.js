const ImageUploadController = require('../controllers/imageUploadController')
const ImageUploadRoutes = require('express').Router()
const authenticateToken = require('../middleware/auth.middleware');
const multer = require("multer");

const upload = multer({ dest: "uploads/" });

ImageUploadRoutes.post('/blogs', authenticateToken, upload.single('image'), ImageUploadController.uploadImageForBlog)
ImageUploadRoutes.post('/users', authenticateToken, upload.single('image'), ImageUploadController.uploadImageForUser)

module.exports = ImageUploadRoutes
