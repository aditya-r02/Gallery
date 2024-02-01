const mongoose = require('mongoose');

const PhotoSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
        truncate: true
    },
    description:{
        type: String,
        required: true,
        truncate: true
    },
    url:{
        type: String,
        required: true,
        truncate: true
    },
    createdAt:{
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model("Photo", PhotoSchema);