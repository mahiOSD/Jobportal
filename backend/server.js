// server.js

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import jobsRouter from './routes/jobs.js';
import authRouter from './routes/auth.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 5001;

const corsOptions = {
  origin: 'https://jobportal-nmce.vercel.app', // Replace with your client's origin
  credentials: true, // Enable credentials
};

app.use(cors(corsOptions));

// Handle preflight requests
app.options('*', cors(corsOptions));

app.use(express.json());

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('MongoDB database connection established successfully');
  })
  .catch((err) => {
    console.error('Could not connect to MongoDB:', err);
  });

app.use('/api/auth', authRouter);
app.use('/api/jobs', jobsRouter);

app.get('/', (req, res) => res.json({ message: 'hello world' }));

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
