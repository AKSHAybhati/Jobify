const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
})

userSchema.pre("save",async function (next) {
    const user = this;
    if(!user.isModified("password")) return next();

    try{
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(user.password,salt);

        user.salt =salt;
        user.password = hash;
        next();
    } catch(err) {
        next(err);
    }
    
})

module.exports = mongoose.model("user",userSchema);


