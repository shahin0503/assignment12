const BlogModel = require('../models/Blog')
const CommentModel = require('../models/Comment')

const blogController = {
	//Get all blogs from the database
	getAllBlogs: async (req, res) => {
		try {
			const blogs = await BlogModel.find().populate({
				path: 'author',
				select: 'fullName image email'
			})

			return res.json({ success: true, data: blogs, message: 'Blogs fetched!' })
		} catch (error) {
			console.error('Error fetching blogs:', error)
			res.status(500).json({ success: false, message: error })
		}
	},

	// Create a new blog
	createBlog: async (req, res) => {
		try {
			const { title, content, image, category } = req.body

			const newBlog = new BlogModel({
				title,
				content,
				image,
				category,
				author: req.user.id
			})

			await newBlog.save()
			return res.json({ success: true, data: newBlog, message: 'Blog created!' })
		} catch (error) {
			console.error('Error creating blog:', error)
			res.status(500).json({ success: false, message: error.message })
		}
	},

	// Get a blog details with comments
	getBlogDetails: async (req, res) => {
		try {
			const blogId = req.params.blogId
			const blog = await BlogModel.findById(blogId)
			if (!blog) {
				return res.status(404).json({ success: false, message: 'Blog not found' })
			}

			const comments = await CommentModel.find({ blogId }).populate(
				'author',
				'fullName email image '
			)

			return res.json({
				success: true,
				data: { comments },
				message: 'Blog details fetched'
			})
		} catch (error) {
			console.error('Error fetching the blog:', error)
			return res.status(500).json({ success: false, message: error.message })
		}
	},

	// Update a blog
	updateBlog: async (req, res) => {
		try {
			const { title, content, image, category } = req.body

			const blog = await BlogModel.findById(req.params.blogId)

			if (!blog) {
				return res.status(404).json({ success: false, message: 'Blog not found' })
			}

			if (req.user.id !== blog.author.toString()) {
				return res.status(403).json({ success: false, message: 'unauthorized' })
			}

			// Create an object with fields to be updated
			const updates = {}
			if (title) updates.title = title
			if (content) updates.content = content
			if (image) updates.image = image
			if (category) updates.category = category

			// Update the blog with the specified fields
			await blog.set(updates).save()

			return res.json({ success: true, data: blog, message: 'Blog created!' })
		} catch (error) {
			console.error('Error updating blog:', error)
			return res.status(500).json({ success: false, message: error.message })
		}
	},

	// Delete a blog
	deleteBlog: async (req, res) => {
		try {
			const blogId = req.params.blogId
			const blog = await BlogModel.findById(blogId)
			if (!blog) {
				return res.status(404).json({ success: false, message: 'blog not found' })
			}
			if (req.user.id !== blog.author.toString())
				return res.status(401).json({
					success: false,
					message: 'You are not allowed to delete this blog'
				})

			await blog.deleteOne()
			return res
				.status(200)
				.json({ success: true, message: 'blog deleted successfully' })
		} catch (error) {
			console.log(error)
			return res
				.status(500)
				.json({ success: false, message: 'Error occured while deleting the blog' })
		}
	}
}

module.exports = blogController
