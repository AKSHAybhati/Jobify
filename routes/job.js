const express = require("express");
const router = express.Router();
const Job = require("../model/job");
const isLoggedIn = require("../middleware/auth")
const application = require("../model/application")

router.get("/jobform",isLoggedIn,(req,res) =>{
    return res.render("jobform")
})

router.get("/application", isLoggedIn, async (req, res) => {
  const jobs = await Job.find({}); // Fetch all jobs from DB
  return res.render("application", { jobs }); // Send all jobs to EJS
});

router.get("/jobform/:id", async (req, res) => {
  const jobId = req.params.id;
  const job = await Job.findById(jobId);
  if (!job) {
    return res.status(404).send("Job not found");
  }
  res.render("applyform", { job });
});

router.post("/apply/:id", async (req, res) => {
  const { name, email, resume } = req.body;
  const jobId = req.params.id;

  try {
    await application.create({
      name,
      email,
      resume,
      job: jobId, // Link to which job the user applied
    });

    res.render("success"); // or res.redirect("/job/application");
  } catch (error) {
    console.error("Error saving application:", error);
    res.status(500).send("Internal Server Error");
  }
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