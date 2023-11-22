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
		default: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fcommons.wikimedia.org%2Fwiki%2FFile%3AWindows_10_Default_Profile_Picture.svg&psig=AOvVaw27AKMnND6EDd7o64jj6X-4&ust=1700744374826000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCLjl5dTU14IDFQAAAAAdAAAAABAE'
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
