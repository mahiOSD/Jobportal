import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import jobsRouter from './routes/jobs.js'; // Ensure correct path to your routes

import mongoose from 'mongoose';
import Job from './models/job.js';


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

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('Error connecting to MongoDB', err);
});

app.get('/', (req, res) => {
    res.send('Hello World!');
});
// Job search endpoint
app.get('/api/jobs', async (req, res) => {
    try {
        const query = req.query.query || '';
        const jobs = await Job.find({ title: new RegExp(query, 'i') });
        res.json(jobs);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching jobs', error: err });
    }
});

// Job details endpoint
app.get('/api/jobs/:id', async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);
        if (!job) return res.status(404).json({ message: 'Job not found' });
        res.json(job);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching job details', error: err });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);

});
