require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const userRoute = require("./routes/user.js")
const jobRoute = require("./routes/job.js")

const cookieparser = require("cookie-parser");

mongoose.connect(process.env.MONGO_URL);
const PORT = process.env.PORT || 8000;

app.use(cookieparser());
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/",(req,res) =>{
    return res.render("signup");
})

app.use("/job",jobRoute)
app.use("/user",userRoute);

app.listen(process.env.PORT || 8000, () => {
  console.log("Server started");
});
