const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    type: {type: String, required: true},
    username: {type: String, required: true},
    email: {type: String, required: true},
    movieList: {type: []},
    avatar: {type: String, required: true},
    password: {type: String, required: true},
    favGenres: {type: []},
    age: {type: String},
    sex: {type: String},
    emailNotifications: {type: Boolean}
})

module.exports = mongoose.model("user", userSchema)