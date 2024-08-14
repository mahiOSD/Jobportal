//auth.js
import express from 'express';
import { registerUser, loginUser, sendResetLink, resetPassword ,getUserProfile } from '../controllers/authController.js';

const router = express.Router();

router.post('/signup', registerUser);
router.post('/login', loginUser);
router.post('/send-reset-link', sendResetLink);
router.post('/reset-password/:token', resetPassword); 
router.get('/profile', getUserProfile);

export default router;
