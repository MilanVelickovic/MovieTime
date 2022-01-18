const mongoose = require("mongoose")

const movieSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    movieId: {type: Number, required: true},
    ratings: {type: []}
})

module.exports = mongoose.model("movie", movieSchema)