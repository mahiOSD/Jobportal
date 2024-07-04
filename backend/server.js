import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
<<<<<<< HEAD
import jobsRouter from './routes/jobs.js'; 
import authRouter from './routes/auth.js'; 
=======
import path from 'path';
import jobsRouter from './routes/jobs.js';
>>>>>>> 2ac89c72285305fe9f22c094789937b7da3b7760

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;


app.use(cors({
  origin: 'http://localhost:5173', 
  credentials: true 
}));
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('MongoDB database connection established successfully');
})
.catch(err => {
  console.error('Could not connect to MongoDB:', err);
});

<<<<<<< HEAD
=======
// Routes
app.use('/api/jobs', jobsRouter);

// Serve static files from the React app
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
  });
}
>>>>>>> 2ac89c72285305fe9f22c094789937b7da3b7760

app.use('/api/auth', authRouter); 
app.use('/api/jobs', jobsRouter); 


app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
