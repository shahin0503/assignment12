const { Schema, model } = require('mongoose')
const CommentModel = require('./Comment')

const blogSchema = new Schema(
	{
		title: {
			type: String,
			required: true
		},
		content: {
			type: String,
			required: true
		},
		image: {
			type: String
		},
		category: {
			type: String,
			required: true
		},
		author: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: true
		}
	},
	{
		timestamps: true
	}
)

blogSchema.pre('remove', async function (next) {
	try {
		await CommentModel.deleteMany({ blogId: this._id })
		next()
	} catch (error) {
		next(error)
	}
})

const Blog = model('Blog', blogSchema)

module.exports = Blog
