const admin = require('firebase-admin')
const credentials = require('../key.json')

admin.initializeApp({
    credential: admin.credential.cert(credentials),
    databaseURL: process.env.FIREBASE_DATABASE,
    storageBucket: process.env.FIREBASE_BUCKET
})

module.exports = admin