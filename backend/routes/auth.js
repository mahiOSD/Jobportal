import express from 'express';
import { registerUser, loginUser  } from '../controllers/authController.js';

const router = express.Router();

// Define the signup & login route
router.post('/signup', registerUser);
router.post('/login', loginUser);
// Define the profile route
//router.get('/profile', auth, getUserProfile);

export default router;
