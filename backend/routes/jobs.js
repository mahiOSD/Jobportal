const express = require('express');
const router = express.Router();
let Job = require('../models/job');

// Get all jobs
router.route('/').get((req, res) => {
  Job.find()
    .then(jobs => res.json(jobs))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Get job by ID
router.route('/:id').get((req, res) => {
  Job.findById(req.params.id)
    .then(job => res.json(job))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Add a new job
router.route('/add').post((req, res) => {
  const { title, description, company, companyLogo, location, type, salary, date } = req.body;
  const newJob = new Job({
    title,
    description,
    company,
    companyLogo,
    location,
    type,
    salary,
    date
  });

  newJob.save()
    .then(() => res.json('Job added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
