import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import Job from '../models/job.js'; 
import Application from '../models/Application.js';
import multer from 'multer';
import auth from '../middleware/auth.js';
import mongoose from 'mongoose';
const router = express.Router();


const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

let exampleJobs = [
  {
    _id: '1',
    title: 'Software Engineer',
    description: 'We are looking for a skilled Software Engineer to join our team...',
    company: 'Tech Solutions Inc.',
    location: 'Dhaka',
    salary: '৳80,000 - ৳100,000 per year',
    icon: '/images/software-engineer-icon.png',
    category: 'backend',
    date: '2024-07-01',
    requiredSkills: ['JavaScript', 'Node.js', 'React'],
    experienceLevel: 'Mid-level',
  },
  {
    _id: '2',
    title: 'Data Scientist',
    description: 'Join our Data Science team to analyze and interpret complex data sets...',
    company: 'Data Analytics Corp.',
    location: 'Dhaka',
    salary: '৳90,000 - ৳110,000 per year',
    icon: '/images/data-scientist-icon.jpg',
    category: 'data science',
    date: '2024-07-02',
    requiredSkills: ['Python', 'Machine Learning', 'Data Analysis'],
    experienceLevel: 'Senior',
  },
  {
    _id: '3',
    title: 'Web Development Teacher',
    description: 'We are seeking a passionate Web Development Teacher to join our education team...',
    company: 'Tech Education Institute',
    location: 'Remote or Dhaka',
    salary: '৳60,000 - ৳80,000 per year',
    icon: '/images/web-development-icon.png',
    category: 'design',
    date: '2024-07-03',
    requiredSkills: ['HTML', 'CSS', 'JavaScript'],
    experienceLevel: 'Mid-level',
  },
  {
    _id: '4',
    title: 'Junior/Graduate Software Developer',
    description: 'We are looking for a Junior/Graduate Software Developer to join our team...',
    company: 'Innovative Tech Solutions',
    location: 'Dhaka',
    salary: '৳50,000 - ৳70,000 per year',
    icon: '/images/software-developer-icon.png',
    category: 'frontend',
    date: '2024-07-04',
    requiredSkills: ['JavaScript', 'React', 'HTML'],
    experienceLevel: 'Entry-level',
  },
  {
    _id: '5',
    title: 'Junior/Graduate Web Developer',
    description: 'Join our dynamic web development team as a Junior/Graduate Web Developer...',
    company: 'Creative Web Agency',
    location: 'Remote or Dhaka',
    salary: '৳45,000 - ৳65,000 per year',
    icon: '/images/web-developer-icon.png',
    category: 'frontend',
    date: '2024-07-05',
    requiredSkills: ['HTML', 'CSS', 'JavaScript'],
    experienceLevel: 'Entry-level',
  },
  {
    _id: '6',
    title: 'Senior Backend Developer',
    description: 'Looking for an experienced Senior Backend Developer to work on our core platform...',
    company: 'FutureTech Solutions',
    location: 'Dhaka',
    salary: '৳100,000 - ৳130,000 per year',
    icon: '/images/Backend.jpg',
    category: 'backend',
    date: '2024-07-06',
    requiredSkills: ['Node.js', 'Express', 'MongoDB'],
    experienceLevel: 'Senior',
  },
  {
    _id: '7',
    title: 'Fullstack Developer',
    description: 'Join our team as a Fullstack Developer and work on both frontend and backend technologies...',
    company: 'Web Innovators Inc.',
    location: 'Dhaka',
    salary: '৳90,000 - ৳120,000 per year',
    icon: '/images/Full stack.jpg',
    category: 'fullstack',
    date: '2024-07-07',
    requiredSkills: ['JavaScript', 'Node.js', 'React'],
    experienceLevel: 'Mid-level',
  },
  {
    _id: '8',
    title: 'UI/UX Designer',
    description: 'We are looking for a creative UI/UX Designer to enhance the user experience of our products...',
    company: 'Design Masters',
    location: 'Dhaka',
    salary: '৳70,000 - ৳90,000 per year',
    icon: '/images/UIUX-Designer.png',
    category: 'design',
    date: '2024-07-08',
    requiredSkills: ['Adobe XD', 'Sketch', 'Figma'],
    experienceLevel: 'Mid-level',
  },
  {
    _id: '9',
    title: 'Frontend Web Developer',
    description: 'Seeking a talented Frontend Web Developer to create visually appealing and responsive web pages...',
    company: 'Tech Innovations',
    location: 'Remote or Dhaka',
    salary: '৳60,000 - ৳80,000 per year',
    icon: '/images/Frontend.jpg',
    category: 'frontend',
    date: '2024-07-09',
    requiredSkills: ['HTML', 'CSS', 'JavaScript'],
    experienceLevel: 'Mid-level',
  },
  {
    _id: '10',
    title: 'Junior Backend Developer',
    description: 'We are looking for a Junior Backend Developer to assist with server-side logic and integration...',
    company: 'Tech Innovations',
    location: 'Dhaka',
    salary: '৳45,000 - ৳65,000 per year',
    icon: '/images/back-end-developer.jpg',
    category: 'backend',
    date: '2024-07-10',
    requiredSkills: ['Node.js', 'Express', 'MongoDB'],
    experienceLevel: 'Entry-level',
  },
  {
    _id: '11',
    title: 'Junior Frontend Developer',
    description: 'Join our team as a Junior Frontend Developer to help build user-friendly web interfaces...',
    company: 'Creative Web Agency',
    location: 'Remote or Dhaka',
    salary: '৳50,000 - ৳70,000 per year',
    icon: '/images/Junior-Frontend.png',
    category: 'frontend',
    date: '2024-07-11',
    requiredSkills: ['HTML', 'CSS', 'JavaScript'],
    experienceLevel: 'Entry-level',
  },
  {
    _id: '12',
    title: 'Senior Frontend Developer',
    description: 'Seeking a Senior Frontend Developer to lead the development of advanced web applications...',
    company: 'FutureTech Solutions',
    location: 'Dhaka',
    salary: '৳100,000 - ৳130,000 per year',
    icon: '/images/Senior-Frontend.png',
    category: 'frontend',
    date: '2024-07-12',
    requiredSkills: ['JavaScript', 'React', 'CSS'],
    experienceLevel: 'Senior',
  },
  {
    _id: '13',
    title: 'Senior Fullstack Developer',
    description: 'Looking for a Senior Fullstack Developer to manage both frontend and backend tasks...',
    company: 'Tech Pioneers Inc.',
    location: 'Dhaka',
    salary: '৳120,000 - ৳150,000 per year',
    icon: '/images/Senior-Full stack.avif',
    category: 'fullstack',
    date: '2024-07-13',
    requiredSkills: ['JavaScript', 'Node.js', 'React'],
    experienceLevel: 'Senior',
  },
];

router.get('/stats', auth(['admin']), async (req, res) => {
  try {
    console.log('User ID:', req.user.id);
    console.log('User Category:', req.user.category); 

    
    if (req.user.category !== 'admin') {
      return res.status(403).json({ message: 'Access denied. Admins only.' });
    }

    const totalJobsFromDB = await Job.countDocuments();
    const totalExampleJobs = exampleJobs.length;
    const totalJobs = totalJobsFromDB + totalExampleJobs;

    const totalApplications = await Application.countDocuments();
    const jobsAdded = await Job.countDocuments({ createdBy: req.user.id });
    
    
    const dbCategoryCounts = await Job.aggregate([
      { $group: { _id: "$category", count: { $sum: 1 } } },
      { $project: { category: "$_id", count: 1, _id: 0 } }
    ]);

    
    const exampleCategoryCounts = exampleJobs.reduce((acc, job) => {
      const category = job.category;
      if (!acc[category]) {
        acc[category] = 0;
      }
      acc[category]++;
      return acc;
    }, {});

    
    const categoryCounts = dbCategoryCounts.map(dbCat => {
      const exampleCount = exampleCategoryCounts[dbCat.category] || 0;
      return { category: dbCat.category, count: dbCat.count + exampleCount };
    });

    
    Object.keys(exampleCategoryCounts).forEach(cat => {
      if (!categoryCounts.find(dbCat => dbCat.category === cat)) {
        categoryCounts.push({ category: cat, count: exampleCategoryCounts[cat] });
      }
    });

    res.json({
      totalJobs,
      totalApplications,
      jobsAdded,
      categoryCounts
    });
  } catch (error) {
    console.error('Error fetching job stats:', error);
    res.status(500).json({ message: 'Error fetching job stats', error: error.message });
  }
});



router.get('/', async (req, res) => {
  try {
    const jobsFromDB = await Job.find();
    res.json([...exampleJobs, ...jobsFromDB]);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching jobs', error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      const jobFromExample = exampleJobs.find(job => job._id === req.params.id);
      if (!jobFromExample) {
        return res.status(404).json({ message: 'Job not found' });
      }
      return res.json(jobFromExample);
    }

    const jobFromDB = await Job.findById(req.params.id);
    if (!jobFromDB) {
      return res.status(404).json({ message: 'Job not found' });
    }

    res.json(jobFromDB);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching job', error: error.message });
  }
});

router.post('/add', auth(['admin']), async (req, res) => {
  const { title, company, description, location, salary, category, date, experienceLevel, requiredSkills } = req.body;

  if (!title || !company || !description || !location || !salary || !category || !date || !experienceLevel || !requiredSkills) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const newJob = new Job({
      title,
      company,
      description,
      location,
      salary,
      category,
      date,
      experienceLevel,
      requiredSkills,
      createdBy: req.user.id,
    });
    const savedJob = await newJob.save();
    res.json(savedJob);
  } catch (error) {
    console.error('Error saving job:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/', (req, res) => {
  const newJob = { _id: uuidv4(), ...req.body };
  exampleJobs.push(newJob);
  res.status(201).json(newJob);
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  try {
    const updatedJob = await Job.findByIdAndUpdate(id, updateData, { new: true });

    if (!updatedJob) {
      return res.status(404).json({ message: 'Job not found' });
    }

    res.json(updatedJob);
  } catch (error) {
    res.status(500).json({ message: 'Error updating job', error: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const job = await Job.findByIdAndDelete(req.params.id);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    res.json({ message: 'Job deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting job', error: error.message });
  }
});

router.delete('/example/:id', (req, res) => {
  const index = exampleJobs.findIndex(job => job._id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ message: 'Job not found' });
  }
  exampleJobs.splice(index, 1);
  res.json({ message: 'Job deleted successfully' });
});

router.post('/applications', upload.single('resume'), async (req, res) => {
  const { jobId, applicantName, applicantEmail, applicantPhone, applicantAddress, coverLetter } = req.body;
  const resume = req.file;

  if (!jobId || !applicantName || !applicantEmail || !applicantPhone || !applicantAddress || !coverLetter || !resume) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const newApplication = new Application({
      jobId,
      applicantName,
      applicantEmail,
      applicantPhone,
      applicantAddress,
      coverLetter,
      resume: resume.buffer,
    });
    const savedApplication = await newApplication.save();
    res.status(201).json(savedApplication);
  } catch (error) {
    console.error('Error saving application:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;
