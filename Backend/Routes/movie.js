const express = require("express")
const Movie = require("../Model/Movie")
const signup = require("../Model/Signup");
const router = express.Router()

// Get all the movies

router.get("/", async (req, res) => {
    try {
        let movieslist = await Movie.find()
        res.status(201).json({ "msg": "ALl movies ", movieslist })

    } catch (error) {
        res.status(500).json({ "msg": "Internal server error" })
    }
})


// Add a new movie

router.post("/new", async (req, res) => {
    const { email, title, description, poster, genre, downloadlink, trailerlink, year, duration, rating } = req.body

    console.log(downloadlink, trailerlink);

    try {
        const user = await signup.findOne({ email })
        if (!user) {
            return res.status(404).json({ "msg": "User not found" })
        }

        const newMovie = new Movie({
            title,
            description,
            poster,
            genre,
            downloadlink,
            trailerlink,
            year,
            duration,
            rating,
            user: user._id,
            email //Associate the movie with the user
        })



        const savedMovie = await newMovie.save() //Save a movie to database

        user.movies.push(savedMovie._id); // Add movie reference to user's movies array
        await user.save();

        console.log("Movie added successfully");

        res.json({ newMovie })



    } catch (error) {
        console.log(error)
    }
})

// Access single movie by id
router.get("/:id",async (req,res) => {
    const {id} = req.params
    if(!id){
        res.status(400).json({
            "msg":"Please enter id"
        })
    }
    try {
        
        const singlemovie =await Movie.findById(id)
        res.json({singlemovie})
    } catch (error) {
        res.status(400).json({error})
    }


})

// get User's all movies

router.post("/userallmovie",async (req,res) => {
    const {email} = req.body
    if(!email){
        res.status(400).json({
            "msg":"Please enter email"
        })
    }
    try {
        const movies = await Movie.find({email})
        res.json({movies})
        
    } catch (error) {
        res.status(400).json({error})
    }
})

// Access movie by a category

router.get("/category/:genre",async (req,res) => {
    const {genre} = req.params
    // console.log(genre);
    if(!genre){
        res.status(400).json({"msg":"Please enter the genre(category"})
    }

    
    try {
        const category = await Movie.find({genre})
        // console.log(category);
        
        res.status(200).json({category})
        
    } catch (error) {
        res.status(400).json({error})
    }
})

// Delete a movie

router.get("/delete/:id",async (req,res) => {
    const {id} = req.params
    // console.log(id);
    if(!id){
        res.status(400).json({"msg":"Please enter id"})
    }

    try {
        const deletemovie = await Movie.findByIdAndDelete(id)
        // console.log(deletemovie);
        res.status(200).json({"msg":"Movie deleted successfully"})
    } catch (error) {
        res.status(400).json({"msg":"Unable to delete movie"})

    }
})
module.exports = router

