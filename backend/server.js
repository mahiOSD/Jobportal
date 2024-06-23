import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import jobsRouter from './routes/jobs.js'; // Ensure correct path to your routes

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true, // Optionally remove this if using the latest mongoose version
  useUnifiedTopology: true, // Optionally remove this if using the latest mongoose version
})
.then(() => console.log('MongoDB database connection established successfully'))
.catch(err => console.error('Could not connect to MongoDB:', err));

// Routes
app.use('/api/jobs', jobsRouter); // Mount jobsRouter for /api/jobs endpoint

// Start server
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
