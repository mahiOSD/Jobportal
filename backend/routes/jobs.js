
import express from 'express';
import Job from '../models/job.js';
const express = require('express');

const router = express.Router();
let Job = require('../models/job');



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


router.put('/update/:id', async (req, res) => {
  try {
    await Job.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json('Job updated!');
  } catch (err) {
    res.status(400).json('Error: ' + err);
  }
});

module.exports = router;
