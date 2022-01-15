const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")
const bcrypt = require("bcrypt")

const User = require("../models/user")

router.post("/login", (req, res, next) => {
    User.find({email: req.body.email})
        .exec()
        .then(user => {
            if (user.length >= 1) {
                bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                    if (result) {
                        return res.status(200).json({
                            message: "Login successfull!",
                            user: {
                                email: user[0].email,
                                type: user[0].type,
                                username: user[0].username,
                                movieList: user[0].movieList,
                                avatar: user[0].avatar,
                                favGenres: user[0].favGenres
                            }
                        })
                    } else {
                        return res.json({
                            message: "Password incorrect!"
                        })
                    }
                })
            } else {
                return res.json({
                    message: "Email not found!"
                })
            }
        })
})

router.put("/update", (req, res, next) => {
    User.find({email: req.body.email})
        .exec()
        .then(user => {
            if (user.length >= 1) {
                User.updateOne({email: req.body.email}, {username: req.body.username}).then(res => {
                    console.log(res)
                }).catch(err => {
                    console.log(err)
                })
                User.updateOne({email: req.body.email}, {avatar: req.body.avatar}).then(res => {
                    console.log(res)
                }).catch(err => {
                    console.log(err)
                })
                User.updateOne({email: req.body.email}, {age: req.body.age}).then(res => {
                    console.log(res)
                }).catch(err => {
                    console.log(err)
                })
                User.updateOne({email: req.body.email}, {sex: req.body.sex}).then(res => {
                    console.log(res)
                }).catch(err => {
                    console.log(err)
                })
                User.updateOne({email: req.body.email}, {favGenres: req.body.favGenres}).then(res => {
                    console.log(res)
                }).catch(err => {
                    console.log(err)
                })

                return res.json({
                    message: "Successfully updated!"
                })
            }

            return res.json({
                message: "Update failed!"
            })
        })
})

router.put("/update/movielist", (req, res, next) => {
    User.find({email: req.body.email})
        .exec()
        .then(user => {
            if (user.length >= 1) {
                User.updateOne({email: req.body.email}, {movieList: req.body.movieList}).then(res => {
                    console.log(res)
                }).catch(err => {
                    console.log(err)
                })

                return res.json({
                    message: "Successfully updated!"
                })
            } 
            return res.json({
                message: "Update failed!"
            })
        })
})

router.post("/register", (req, res, next) => {

    User.find({email: req.body.email})
        .exec()
        .then(user => {
            if (user.length >= 1) {
                return res.json({
                    message: "Email already exists!"
                })
            } else {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        return res.status(500).json({
                            error: err
                        })
                    } else {
                        const user = new User({
                            _id: new mongoose.Types.ObjectId(),
                            type: req.body.type,
                            username: req.body.type,
                            email: req.body.email,
                            movieList: req.body.movieList,
                            avatar: req.body.avatar,
                            password: hash,
                            favGenres: req.body.favGenres,
                            age: req.body.age,
                            sex: req.body.sex,
                            emailNotifications: req.body.emailNotifications
                        })
                        user
                            .save()
                            .then(result => {
                                console.log(result)
                                res.json({
                                    message: "Successfully registered!"
                                })
                            })
                            .catch(error => {
                                console.log(error)
                                res.status(500).json({
                                    error: error
                                })
                            })
                    }
                })
            }
        })
})

module.exports = router