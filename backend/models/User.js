import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: false }, // Make optional
  phone: { type: String, required: false },
  profilePicture: { type: String, default: '' }, // Optional and used later in profile

});
/*
careerObjective: { type: String, required: false },
careerSummary: { type: String, required: false },
signature: { type: String, required: false },
*/
const User = mongoose.model('User', userSchema);
export default User;
