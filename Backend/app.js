const express = require("express")
const dbConnect = require("./Config/dbConnect.js")
const cors = require("cors")
const signup = require("./Routes/signup.js")
const movie = require("./Routes/movie.js")
const app = express()

//Middleware
app.use(express.json())

app.use(cors())

app.listen(8080,async (req,res) => {

    await dbConnect()
    console.log("Welcome to MovieWorld");
})

app.get("/",async (req,res) => {
    res.json({
        "msg":"Working"
    })
})

app.use("/api",signup)
app.use("/movie",movie)