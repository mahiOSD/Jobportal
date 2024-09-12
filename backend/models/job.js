import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema({
  title: String,
  company: String,
  description: String,
  location: String,
  salary: String,
  category: String,
  date: String,
  experienceLevel: String,
  requiredSkills: [String],
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, 
});

export default mongoose.model('Job', jobSchema);
