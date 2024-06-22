import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const jobSchema = new Schema({
  title: { type: String, required: true },
  companyName: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: String, required: true },
  jobType: { type: String, required: true },
  salary: { type: String, required: true },
  date: { type: String, required: true },
  experienceLevel: { type: String, required: true },
  requiredSkills: { type: [String], required: true },
});

const Job = mongoose.model('Job', jobSchema);

export default Job;