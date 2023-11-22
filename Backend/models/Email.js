const { Schema, model } = require('mongoose')

const emailSchema = new Schema(
	{
		title:{
			type: String,
			required: true
		},

		content: {
			type: String,
			required: true
		},

		email: {
			type: String,
			required: true
		}
	},
	{
		timestamps: true
	}
)

const Email = model('Email', emailSchema)

module.exports = Email
