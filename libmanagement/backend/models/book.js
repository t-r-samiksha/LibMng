const mongoose = require('mongoose')

const bookschema = new mongoose.Schema({
    title : String,
    author_name : String,
    image : String,
    rating : Number,
    noofreaders : Number,
    genres : [String],        
    synopsis : String
})

module.exports = mongoose.model("Book",bookschema)