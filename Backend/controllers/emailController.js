const sendEmail = require('../helpers/mailer')
const EmailModel = require('../models/Email')

const emailController = {
	send: async (req, res) => {
		try {
			const { email, content } = req.body

			await sendEmail(email)

			const newEmail = new EmailModel({ email, content })
			await newEmail.save()

			return res.json({
				success: true,
				data: newEmail,
				message: 'Mail sent successfully'
			})
		} catch (error) {
			console.log(error)
			return res
				.status(500)
				.json({ success: false, message: 'Error sending email' })
		}
	}
}

module.exports = emailController
