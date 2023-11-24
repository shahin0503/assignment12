const nodemailer = require('nodemailer')

const sendEmail = async email => {
	try {
		const transport = nodemailer.createTransport({
			host: 'sandbox.smtp.mailtrap.io',
			port: 2525,
			auth: {
				user: process.env.MAILTRAP_USER,
				pass: process.env.MAILTRAP_PASSWORD
			}
		})

		let emailTemplate = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Thank You for Contacting Us</title>
  <style>
    body {
      font-family: 'Arial', sans-serif;
      background-color: #f4f4f4;
      margin: 0;
      padding: 0;
    }

    .container {
      max-width: 600px;
      margin: 20px auto;
      background-color: #fff;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }

    h1 {
      color: #333;
    }

    p {
      color: #555;
    }

    .signature {
      margin-top: 20px;
      color: #888;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>Thank You for Contacting Us!</h1>
    <p>We appreciate your inquiry and would like to assure you that we have received your message. Our team will review your query and get back to you shortly.</p>
    
    <p>Thank you for choosing our services!</p>

    <div class="signature">
      <p>Best regards,</p>
      <p>Blog App</p>
    </div>
  </div>
</body>
</html> `

		// Create mailOptions
		const mailOptions = {
			to: email,
			from: 'hello@blogapp.com',
			subject: 'Thank You for contacting us',
			html: emailTemplate
		}

		const mailresponse = await transport.sendMail(mailOptions)

		return mailresponse
	} catch (error) {
    console.log(error)
  }
}

module.exports = sendEmail