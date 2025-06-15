const express = require("express");
const router = express.Router();
const Job = require("../model/job");
const isLoggedIn = require("../middleware/auth")

router.get("/jobform",isLoggedIn,(req,res) =>{
    return res.render("jobform")
})

router.get("/application", isLoggedIn, async (req, res) => {
  const jobs = await Job.find({}); // Fetch all jobs from DB
  return res.render("application", { jobs }); // Send all jobs to EJS
});

router.post("/jobform", isLoggedIn, async (req, res) => {
  const { title, company, location, description } = req.body;

  await Job.create({
    title,
    company,
    location,
    description,
  });

  return res.redirect("/job/application"); // Redirect instead of sending single job
});

module.exports = router;