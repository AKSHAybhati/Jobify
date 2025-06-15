const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const app = express();
const userRoute = require("./routes/user.js")
const jobRoute = require("./routes/job.js")
const PORT = 8000;
const cookieparser = require("cookie-parser");

mongoose.connect("mongodb://localhost:27017/jobify");
app.use(express.json());
app.use(cookieparser());
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));

app.get("/",(req,res) =>{
    return res.render("signup");
})

app.use("/job",jobRoute)
app.use("/user",userRoute);

app.listen(PORT, () => console.log("server started!!"))
