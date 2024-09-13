
import express from 'express';
import {
  registerUser,
  loginUser,
  sendResetLink,
  resetPassword,
  getUserProfile,
  refreshToken
} from '../controllers/authController.js';

const router = express.Router();

router.post('/signup', registerUser);
router.post('/login', loginUser);
router.post('/send-reset-link', sendResetLink);
router.post('/reset-password/:token', resetPassword);
router.get('/profile', getUserProfile);
router.post('/refresh', refreshToken); 

export default router;
