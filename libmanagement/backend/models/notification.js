const mongoose = require('mongoose')

const notificationSchema = new mongoose.Schema(
    {
        name: String,
        type: String,
        book: String,
        time: String
    }
)

module.exports = mongoose.model('Notifications', notificationSchema, 'notification');