const commentModel = require('../models/Comment')
const BlogModel = require('../models/Blog')

const commentController = {
	addComment: async (req, res) => {
		try {
			const { content, blogId } = req.body
			const blog = await BlogModel.findById(blogId)
			if (!blog) {
				return res.status(500).json({ success: false, message: 'Blog not found' })
			}
			const comment = new commentModel({ content, blogId, author: req.user.id })

      await comment.save()

      return res.json({ success: true, data: comment, message: 'Comment posted' })
		} catch (error) {
			console.log(error)
			return res.status(500).json({ success: false, message: error.message })
		}
	},

  editComment: async (req, res) => {
    try {
      const { content} = req.body
      const commentId = req.params.commentId
      const comment = await commentModel.findById(commentId)
      if (!comment) {
        return res.status(404).json({ success: false, message: 'Comment not found' })
      }
      if (req.user.id !== comment.author.toString())
        return res.status(401).json({ success: false, message: 'You are not allowed to edit this comment'})
      comment.content = content
      await comment.save()

      return res.json({ success: true, data: comment, message: 'Comment updated successfully' })
    } catch (error) {
      console.log(error)
			return res.status(500).json({ success: false, message: error.message })
    }
  },

  deleteComment: async (req, res) => {
    try {
      const commentId = req.params.commentId
      const comment = await commentModel.findById(commentId)
      if (!comment) {
        return res.status(404).json({ success: false, message: 'Comment not found' })
      }
      if (req.user.id !== comment.author.toString())
        return res.status(401).json({ success: false, message: 'You are not allowed to delete this comment'})
      
      await comment.deleteOne()
      return res.status(200).json({ success: true, message: 'Comment deleted successfully' });
    } catch (error) {
      console.log(error)
			return res.status(500).json({ success: false, message: 'Error occured while deleting the comment' })
    }
  }
}

module.exports = commentController