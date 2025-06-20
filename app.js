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

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB Connected"))
.catch((err) => console.error("❌ MongoDB connection error:", err));

const PORT = process.env.PORT || 8001;

app.use(cookieparser());
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

//app.get("/",(req,res) =>{
  //  return res.render("signup");
//})

app.get("/health", (req, res) => {
  res.status(200).send("✅ Server is healthy");
});

app.use("/job",jobRoute)
app.use("/user",userRoute);

app.listen(PORT, () => {
  console.log(`🚀 Server started on port ${PORT}`);
});
