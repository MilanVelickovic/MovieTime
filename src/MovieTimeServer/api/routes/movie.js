const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")

const Movie = require("../models/movie")

router.get("/all", (req, res, next) => {
    if (req.body.securityCode === "w@>*5ZA{Qe/eH`9P") {
        Movie.find({}, (err, result) => {
            if (err) {
                return res.json({
                    message: "Something went wrong."
                })
            } else {
                if (result) {
                    return res.json({
                        ratings: result
                    })
                }
            }
        })
    } else {
        return res.json({
            message: "You don't have access for this endpoint."
        })
    }
})

router.post("/israted", (req, res, next) => {
    Movie.find({movieId: req.body.movieId})
         .exec()
         .then(movie => {
            if (movie.length >= 1) {
                if (movie[0].ratings.find(rating => {
                    return rating.userEmail === req.body.userEmail
                    })) {
                        return res.json({
                            rated: true,
                            rate: movie[0].ratings.find(rating => rating.userRate)
                        })
                }
            } 

            return res.json({
                rated: false
            })
         })
})

router.post("/ratemovie", (req, res, next) => {

    Movie.find({movieId: req.body.movieId})
         .exec()
         .then(movie => {
             if (movie.length >= 1) {
                // if movie ratings exists in db
                
                if (movie[0].ratings.find(rating => {
                    return rating.userEmail === req.body.userEmail
                    })) {
                    // if user already rated the movie
                    
                    return res.json({
                        message: "User already rated this movie."
                    })
                } else {
                    // if user is rating the movie for the first time
                    // return res.json({
                    //     message: "User is rating this movie for the first time."
                    // })
                    
                    let rating = {
                        userEmail: req.body.userEmail,
                        userRate: req.body.userRate
                    }

                    console.log(movie[0].ratings)
                    Movie.updateOne({movieId: req.body.movieId}, {ratings: [...movie[0].ratings, rating]}).then(res => {
                        console.log(res)
                    }).catch(err => {
                        console.log(err)
                    })
                }
             } else {
                // if the movie is rated for the first time
                const movie = new Movie({
                    _id: new mongoose.Types.ObjectId(),
                    movieId: req.body.movieId,
                    ratings: [
                        {
                            userEmail: req.body.userEmail,
                            userRate: req.body.userRate
                        }
                    ]
                })

                console.log(movie)

                movie.save()
                    .then(result => {
                        console.log(result)
                        res.json({
                            message: "Successfully rated!"
                        })
                    })
                    .catch(error => {
                        console.log(result)
                        res.status(500).json({
                            error: error
                        })
                    })
             }
         })

})

module.exports = router