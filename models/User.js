const { Schema, model } = require('mongoose')
const bcrypt = require('bcrypt')
const ProjectModel = require('./Project')

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

userSchema.pre('save', function (next) {
	//Hash the password
	const salt = bcrypt.genSaltSync(10)
	const hash = bcrypt.hashSync(this.password, salt)
	this.password = hash

	next()
})

userSchema.pre('remove', async function (next) {
  try {
    await ProjectModel.deleteMany({owner: this._id})    
    next()
  } catch (error) {
    next(error) 
  }
})

const User = model('User', userSchema)

module.exports = User
