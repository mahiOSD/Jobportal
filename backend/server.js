import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import jobsRouter from './routes/jobs.js';
import authRouter from './routes/auth.js';
import profileRouter from './routes/profile.js';
import auth from './middleware/auth.js';


dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

//const allowedOrigins = ['http://localhost:5173', 'https://myjobportal.com'];
const allowedOrigins = ['https://jobportal-nmce.vercel.app', 'https://myjobportal.com'];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));

app.use(express.json());

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB database connection established successfully');
  })
  .catch((err) => {
    console.error('Could not connect to MongoDB:', err);
  });

app.use('/api/auth', authRouter);
app.use('/api/jobs', jobsRouter);
app.use('/api/profile', profileRouter);
//app.use('/api/profile', auth, profileRouter);
//app.use('/api/jobs', auth, jobsRouter);


app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
