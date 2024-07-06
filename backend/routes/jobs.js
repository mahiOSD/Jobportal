import express from 'express';
//import auth from '../middleware/auth.js';
import Job from '../models/job.js'; 

const router = express.Router();

// Apply auth middleware to protect routes
//router.use(auth);

router.get('/', async (req, res) => {
  try {
    const jobs = await Job.find();
    res.json(jobs);
  } catch (err) {
    res.status(400).json('Error: ' + err);
  }
});


router.post('/add', async (req, res) => {
  const { title, companyName, description, location, jobType, salary, date, experienceLevel, requiredSkills } = req.body;
  const newJob = new Job({ title, companyName, description, location, jobType, salary, date, experienceLevel, requiredSkills });

  try {
    await newJob.save();
    res.json('Job added!');
  } catch (err) {
    res.status(400).json('Error: ' + err);
  }
});


router.get('/:id', async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    res.json(job);
  } catch (err) {
    res.status(400).json('Error: ' + err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await Job.findByIdAndDelete(req.params.id);
    res.json('Job deleted.');
  } catch (err) {
    res.status(400).json('Error: ' + err);
  }
});


router.put('/update/:id', async (req, res) => {
  try {
    await Job.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json('Job updated!');
  } catch (err) {
    res.status(400).json('Error: ' + err);
  }
});
/*
router.get('/', async (req, res) => {
  try {
    const jobs = await Job.find();
    res.json(jobs);
  } catch (err) {
    res.status(400).json('Error: ' + err);
  }
});
*/
export default router;
