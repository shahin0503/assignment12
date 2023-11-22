const { Schema, model } = require('mongoose')
const ProjectModel = require('./Project')
const BlogModel = require('./Blog')
const CommentModel = require('./Comment')

const userSchema = new Schema({
	fullName: {
		type: String,
		default: ''
	},
	email: {
		type: String,
		unique: true,
		required: true
	},
	image: {
		type: String,
		default: ''
	},
  bio: {
    type: String,
    default: ''
  },
	password: {
		type: String,
		required: true
	},
	phoneNumber: {
		type: String,
		default: ''
	}
},{
  timestamps: true,
})

userSchema.pre('remove', async function (next) {
  try {
    await ProjectModel.deleteMany({owner: this._id})
		await BlogModel.deleteMany({owner: this._id})
		await CommentModel.deleteMany({owner: this._id})
    next()
  } catch (error) {
    next(error) 
  }
})

const User = model('User', userSchema)

module.exports = User
