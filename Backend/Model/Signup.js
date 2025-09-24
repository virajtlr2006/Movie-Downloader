const express = require("express")
const { default: mongoose } = require("mongoose")

const signupSchema = new mongoose.Schema({
    "email":{type:String , require:true},
    "name" :{type:String},
    "image":{type:String},
    "password":{type:String , reqruire:true},
    "movies": [{ type: mongoose.Schema.Types.ObjectId, ref: "Movie" }]
})

//Export the SignUp model
module.exports = mongoose.model("Signup",signupSchema);