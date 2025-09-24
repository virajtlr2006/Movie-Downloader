const mongoose = require ("mongoose")

const movieSchema = new mongoose.Schema({
    "title" : {type:String , required:true}, //Movie title
    "email" : {type:String , required:true}, //Email of a user who added the movie
    "description" : {type:String , required:true}, //Movie description
    "poster" : {type:String , required:true}, //URL of the movie poster
    "genre" : {type:String , required:true}, //Movie genre(Category of a movie)
    "downloadlink" : {type:String }, //Movie download link
    "trailerlink" : {type:String , required:true}, //Movie trailer link
    "year" : {type:Number , required:true}, //Release year of a movie
    "duration" : {type:Number , required:true}, //Movie duration
    "rating" : {type:Number , required:true , min:0 , max:10}, //Movie rating 1-10
    "user" : {type:mongoose.Schema.Types.ObjectId , ref:"Signup" , required:true} //Reference to the user who added the movie
})

module.exports = mongoose.model("Movie",movieSchema)