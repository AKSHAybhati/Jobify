const express = require("express");
const router = express.Router();
const User = require("../model/user");
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");
const JWT_SECRET = "myverysecretkey";

router.get("/signup",(req,res) =>{
    return res.render("signup")
})

router.get("/signin", (req,res) =>{
    return res.render("signin");
})

router.get("/warn", (req,res) =>{
    return res.render("warn");
})

router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    await User.create({ name, email, password });
    return res.redirect("/user/signin");
  } catch (err) {
    if (err.code === 11000) {
      // Duplicate key error (email already exists)
      return res.render("signup", { error: "Email already registered. Please sign in." });
    }
    // For any other error
    return res.render("signup", { error: "Something went wrong. Please try again." });
  }
});


router.post("/signin",async(req, res) =>{
    const{email,password}= req.body;

    try{
        const user = await User.findOne({email});
        if(!user){
            return res.status(401).send("invalid user");
        }
        const matched = await bcrypt.compare(password,user.password);

        if (!matched) {
            return res.render("signin",{error:"invalid password"});
        }
        const token = JWT.sign({ id:user._id, email:user.email}, JWT_SECRET);
        res.cookie("token", token, {
        httponly: true,
        secure: false, 
        });
        return res.render("jobform");
     }catch(err){
        console.error(err);
        return res.status(500).send("Server error");
     }
})

    router.get("/logout", async(req,res) =>{
        res.clearCookie("token", {path:"/"});
        res.redirect("job/jobform");
    })

module.exports = router;