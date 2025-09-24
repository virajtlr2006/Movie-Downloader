const express = require("express")
const Signup = require("../Model/Signup.js")
const jwt = require("jsonwebtoken")
const verifyToken = require("./verifyToken.js")

const router = express.Router()

// Signup

router.post("/signup", async (req, res) => {
    const { email, name, password } = req.body


    try {
        //Check if user alerady exists
        let exist = await Signup.find({ "email": email })
        if (exist.length == 1) {
            return res.status(400).json({
                "msg": "User Already Exists."
            })
        }

        const newUser = new Signup({
            email,
            name,
            password
        })

        //Save the user into the database
        await newUser.save()
        res.json({
            "msg": "Signedup Successfully"
        })
    } catch (error) {
        console.log("Error during the Signup:", error);
        res.status(500).json({ "msg": "Internal Server Error" })
    }
    console.log(email, name, password);

}
)

// Login

router.post("/login", async (req, res) => {
    const { email, password } = req.body

    let user = await Signup.find({ "email": email })
    console.log(user);

    if (user.length == 0) {
        res.status(400).json({ "msg": "SignUp first" })
    }
    else if (user[0].password != password) {
        res.status(400).json({
            "msg": "wrong pass"
        })
    }

    else {
        res.json({
            "msg": "Login Successful"
        })
    }
})

// Profile

router.post("/profile", async (req, res) => {
  const {token} = req.body
  console.log(token );
  const email = jwt.verify(token,"b").email
  console.log(email);
  const profile = await Signup.findOne({email})
//   console.log(profile);
  res.status(200).json({profile})
})

// Profile Edit

router.put("/editprofile/:email", async (req, res) => {

    try {
        const { email } = req.params
        const { name, password,image } = req.body

        const updatedUser = await Signup.findOneAndUpdate(
            {"email":email}, //Find profile by email
            {"name":name, "password":password,"image":image}, //Update name,image  and password
            {new:true} //Return the updated  name,image and password
        )

        if(!updatedUser){
            return res.status(404).json({"msg":"User not found"})
        }
        res.status(200).json({"msg":"Profile Updated Successfully",updatedUser})
        
    } catch (error) {
       res.status(500).json({ "msg": "Server error" });
    }
})

router.post("/signinnew",async (req,res) => {
    const {email,password} = req.body
    // console.log(email,password);
    const user = await Signup.findOne({email})
    // console.log(user.password);
    if(!user){
        res.status(400).json({"msg":"User not found"})
    }
    if(password != user.password){
        res.status(400).json({"msg":"Enter correct password"})
    }
    //Generate token
    const token = jwt.sign({email},"b",{expiresIn:"1d"})
    // console.log(token);
    res.json({token})
})

module.exports = router