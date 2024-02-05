const mongoose = require('mongoose');


const ratingSchema = new mongoose.Schema({
    value:{
        type: Number,
        required: true,
        min: 1,
        max: 5
    },

    description: {
        type: String,
        required: true,
    }
})



const Rating = mongoose.model('Rating', ratingSchema)
module.exports = Rating;