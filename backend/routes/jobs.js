import express from 'express';
import Job from '../models/job.js'; // Example, adjust the path as per your project structure

const router = express.Router();

router.route('/').get((req, res) => {
  Job.find()
    .then(jobs => res.json(jobs))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const { title, description } = req.body;
  const newJob = new Job({ title, description });

  newJob.save()
    .then(() => res.json('Job added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

export default router;
