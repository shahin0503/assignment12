const ProjectModel = require('../models/Project')

const projectController = {
	addProject: async (req, res) => {
		try {
			const { title, technologies, description, demoLink, githubLink } = req.body
			const project = new ProjectModel({
				title,
				technologies,
				description,
				demoLink,
				githubLink,
				owner: req.user.id
			})
			await project.save()
			return res.json({
				success: true,
				data: project,
				message: 'Project created successfully'
			})
		} catch (error) {
			console.log(error)
			return res
				.status(500)
				.json({ success: false, message: 'Error occured while saving project' })
		}
	},
	updateProject: async (req, res) => {
		try {
			const { title, technologies, description, demoLink, githubLink } = req.body

			const project = await ProjectModel.findById(req.params.projectId)

			if (!project)
				return res
					.status(404)
					.json({ success: false, message: 'Project not found' })

			if (req.user.id !== project.owner.toString())
				return res
					.status(403)
					.json({
						success: false,
						message: 'You are not allowed to edit this project'
					})

			// Create an object with fields to be updated
			const updates = {}
			if (title) updates.title = title
			if (technologies) updates.technologies = technologies
			if (description) updates.description = description
			if (demoLink) updates.demoLink = demoLink
			if (githubLink) updates.githubLink = githubLink

			// Update the project with the specified fields
			await project.set(updates).save()

			return res.json({
				success: true,
				data: project,
				message: 'Project updated successfully'
			})
		} catch (error) {
			console.log(error)
			return res
				.status(500)
				.json({
					success: false,
					message: 'Error occured while updating the project'
				})
		}
	},
	deleteProject: async (req, res) => {
		try {
			const projectId = req.params.projectId
			const project = await ProjectModel.findById(projectId)
			if (!project)
				return res
					.status(404)
					.json({ success: false, message: 'Project not found' })
			if (req.user.id !== project.owner.toString())
				return res
					.status(401)
					.json({
						success: false,
						message: 'You are not allowed to delete this project'
					})

			await project.deleteOne()
			return res
				.status(200)
				.json({ success: true, message: 'Project deleted successfully' })
		} catch (error) {
			console.log(error)
			return res
				.status(500)
				.json({
					success: false,
					message: 'Error occured while deleting the project'
				})
		}
	}
}

module.exports = projectController
