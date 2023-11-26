const express = require('express')
const helmet = require('helmet')
const bodyParser = require('body-parser')
const cors = require('cors')
const UserRoutes = require('./routes/userRoutes')
const BlogRoutes = require('./routes/blogRoutes')
const CommentRoutes = require('./routes/commentRoutes')
const ProjectRoutes = require('./routes/projectRoutes')
const EmailRoutes = require('./routes/emailRoutes')
const ImageUploadRoutes = require('./routes/imageRoutes')
require('dotenv').config();

const connect = require('./config/db')
const port = 3000

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(helmet())
app.use(cors())
connect()

app.use('/api/users', UserRoutes)
app.use('/api/blogs', BlogRoutes)
app.use('/api/comments', CommentRoutes)
app.use('/api/projects', ProjectRoutes)
app.use('/api/email', EmailRoutes)
app.use('/api/images', ImageUploadRoutes)

// Start the server
app.listen(port, async () => {
	console.log(`Server is running on port ${port}`)
})
