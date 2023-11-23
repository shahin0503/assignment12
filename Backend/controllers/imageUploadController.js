const admin = require('../config/firebase');
const { Storage } = require("@google-cloud/storage");

const storage = new Storage({
  projectId: "assignment8-ba343",
  keyFilename: "./key.json", 
});

const bucket = storage.bucket(admin.app().options.storageBucket);

const imageUploadController = {
  uploadImageForBlog: async (req, res) => {
    const {file} = req
    if (!file) {
      return res.status(400).json({success: false, message: 'No file was uploaded'})
    }

    const destination = `images/blogs/${file.originalname}`

    try {
      const img = await bucket.upload(file.path, {
        destination: destination,
        metadata: {
          contentType: file.mimetype,
        }
      })

      return res.json({data: img[0].metadata})
    } catch (error) {
      console.log(error)
      return res.status(500).json({success: false, message: 'Error occurred while uploading image'})   
    }
  },

  uploadImageForUser: async (req, res) => {
    const {file} = req
    if (!file) {
      return res.status(400).json({success: false, message: 'No file was uploaded'})
    }

    const destination = `images/users/${file.originalname}`

    try {
      const img = await bucket.upload(file.path, {
        destination: destination,
        metadata: {
          contentType: file.mimetype,
        }
      })
      return res.json({data: img[0].metadata})

    } catch (error) {
      console.log(error)
      return res.status(500).json({success: false, message: 'Error occurred while uploading image'})   
    }
  }
}

module.exports = imageUploadController