const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const mongoose = require("mongoose")

const PASS = "milan.velickovic.4101.2"

const uri = "mongodb+srv://admin:" + PASS + "@movie-time-rest-api.vxq6i.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
mongoose.connect(uri)

const userRoutes = require("./api/routes/user")
const movieRoutes = require("./api/routes/movie")

app.use(bodyParser.urlencoded({
    extended: false
}))

app.use(bodyParser.json())

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", '*')
    res.setHeader("Access-Control-Allow-Headers", '*')
    if (req.method === "OPTIONS") {
        res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE")
        return  res.status(200).json({})
    }
    next()
})

app.use("/user", userRoutes)
app.use("/rate", movieRoutes)

app.use((req, res, next) => {
    const error = new Error(" Not found!")
    error.status(404)
    next(error)
})

app.use((error, req, res, next) => {
    res.status(error.status || 500)
    res.json({
        error: {
            message: error.message
        }
    })
})

module.exports = app