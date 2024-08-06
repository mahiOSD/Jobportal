import mongoose from 'mongoose';
const { Schema } = mongoose;

const jobSchema = new Schema({
  title: { type: String, required: true },
  company: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: String, required: true },
  salary: { type: String, required: true },
  category: { type: String, required: true }, 
  date: { type: String, required: true }, 
  experienceLevel: { type: String, required: true }, 
  requiredSkills: { type: String, required: true },   
}, {
  timestamps: true,
});

const Job = mongoose.model('Job', jobSchema);
export default Job;
