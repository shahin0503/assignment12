const admin = require('firebase-admin')
const credentials = require('../key.json')

admin.initializeApp({
    credential: admin.credential.cert(credentials),
    databaseURL: 'https://assignment8-ba343-default-rtdb.asia-southeast1.firebasedatabase.app',
    storageBucket: 'gs://assignment8-ba343.appspot.com/'
})

module.exports = admin