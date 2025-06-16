const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  title: String,
  company: String,  
  location: String,
  description: String,
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  resume:{
    type:String,
  },

});

module.exports = mongoose.model("job",jobSchema)