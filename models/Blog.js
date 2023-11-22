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
			type: String,
			default: 'https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg'
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
