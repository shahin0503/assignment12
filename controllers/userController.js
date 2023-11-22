const UserModel = require('../models/User')
const ProjectModel = require('../models/Project')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const userController = {
	signup: async (req, res) => {
		try {
			const { fullName, email, image, bio, password, phoneNumber } = req.body
			const salt = bcrypt.genSaltSync(10)
			const hash = bcrypt.hashSync(password, salt)
			const newUser = new UserModel({
				fullName,
				email,
				image,
				bio,
				password: hash,
				phoneNumber
			})
			await newUser.save()
			const token = jwt.sign({ id: newUser._id }, 'my-jwt-secret')
			return res.json({
				success: true,
				data: { ...newUser.toObject(), token },
				message: 'User created!'
			})
		} catch (error) {
			return res.status(500).json({ success: false, message: error.message })
		}
	},

	signIn: async (req, res) => {
		try {
			const { email, password } = req.body

			const foundUser = await UserModel.findOne({ email: email })
			if (!foundUser) {
				return res.status(400).json({ success: false, message: 'User not found!' })
			}

			const passwordsMatch = bcrypt.compareSync(password, foundUser.password)

			if (!passwordsMatch) {
				return res
					.status(400)
					.json({ success: false, message: 'Incorrect password!' })
			}
			const token = jwt.sign({ id: foundUser._id }, 'my-jwt-secret')
			return res.json({ success: true, data: { ...foundUser.toObject(), token } })
		} catch (error) {
			return res.status(500).json({ success: false, message: error.message })
		}
	},

	updateUser: async function (req, res) {
		try {
			const userId = req.user.id
			const { fullName, email, image, bio, password, phoneNumber } = req.body

			const user = await UserModel.findById(userId)

			if (!user) {
				return res.status(404).json({ success: false, message: 'User not found' })
			}

			const updates = {}
			if (fullName) updates.fullName = fullName
			if (email) updates.email = email
			if (image) updates.image = image
			if (bio) updates.bio = bio
			if (password) {
				const salt = bcrypt.genSaltSync(10)
				const hash = bcrypt.hashSync(password, salt)
				updates.password = hash
			}
			if (phoneNumber) updates.phoneNumber = phoneNumber

			await user.set(updates).save()
			return res.json({
				success: true,
				data: user,
				message: 'User updated!'
			})
		} catch (error) {
			console.log(error)
			return res
				.status(500)
				.json({ success: false, message: 'Error occured while updating the user' })
		}
	},

	listUsers: async (req, res) => {
		try {
			let users = await UserModel.find({}).select('-password')
			// sends the users list without the current user
			users = users.filter(user => user._id.toString() !== req.user.id)
			return res.json({
				success: true,
				data: users,
				message: 'Users fetched successfully'
			})
		} catch (error) {
			console.log(error)
			return res
				.status(500)
				.json({ success: false, message: 'Error occured while fetching the users' })
		}
	},
	getUserDetails: async (req, res) => {
		try {
			const userId = req.params.userId
			const user = await UserModel.findById(userId).select('-password')

			if (!user)
				return res.status(404).json({ success: false, message: 'User not found' })

			return res.json({
				success: true,
				data: user,
				message: 'Users fetched successfully'
			})
		} catch (error) {
			console.log(error)
			return res
				.status(500)
				.json({ success: false, message: 'Error occured while fetching the user' })
		}
	},
	getProjectsForAUser: async (req, res) => {
		try {
			const userId = req.params.userId
			const projects = await ProjectModel.find({owner: userId})
			return response.json({
				success: true,
				data: projects,
				message: 'Projects fetched successfully'
			})
		} catch (error) {
			console.log(error)
			return res
				.status(500)
				.json({ success: false, message: 'Error occured while fetching projects' })
		}
	}
}

module.exports = userController
