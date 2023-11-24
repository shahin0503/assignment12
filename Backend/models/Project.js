const {Schema, model} = require('mongoose')

const projectSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  technologies: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  demoLink: {
    type: String,
    default: ''
  },
  githubLink: {
    type: String,
    default: ''
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
},{
  timestamps: true,
})

const Project = model('Project', projectSchema)

module.exports = Project