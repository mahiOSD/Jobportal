import express from 'express';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

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
  },

];

router.get('/', (req, res) => {
  res.json(exampleJobs);
});


router.get('/:id', (req, res) => {
  const job = exampleJobs.find(job => job._id === req.params.id);
  if (!job) {
    return res.status(404).json({ message: 'Job not found' });
  }
  res.json(job);
});


router.post('/', (req, res) => {
  const newJob = { _id: uuidv4(), ...req.body };
  exampleJobs.push(newJob);
  res.status(201).json(newJob);
});


router.put('/:id', (req, res) => {
  const index = exampleJobs.findIndex(job => job._id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ message: 'Job not found' });
  }
  exampleJobs[index] = { ...exampleJobs[index], ...req.body };
  res.json(exampleJobs[index]);
});


router.delete('/:id', (req, res) => {
  const index = exampleJobs.findIndex(job => job._id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ message: 'Job not found' });
  }
  exampleJobs.splice(index, 1);
  res.json({ message: 'Job deleted successfully' });
});

export default router;