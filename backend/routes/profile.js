import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';  // Make sure you import fs to handle file deletions
import User from '../models/User.js'; // Adjust the path based on your project structure

const router = express.Router();
const app = express();

// Multer configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/profile_pictures'); // Directory to save uploaded files
  },
  filename: (req, file, cb) => {
    // Unique filename to prevent overwriting
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

// File filter to accept only images
const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|webp/;
    const mimeType = allowedTypes.test(file.mimetype);
  const extName = allowedTypes.test(path.extname(file.originalname).toLowerCase());

  if (mimeType && extName) {
    return cb(null, true);
  }
  cb(new Error('Only images are allowed'));
};

const upload = multer({
    storage: storage,
    limits: { fileSize: 1024 * 1024 * 5 }, // 5 MB size limit
    fileFilter: fileFilter
  });
  
// Export the upload middleware using ES modules syntax
export { upload };

router.post('/uploadProfilePicture', upload.single('profilePicture'), async (req, res) => {
  try {
    const userId = req.body.userId;
    if (!userId) {
      return res.status(400).json({ error: 'User ID is required' });
    }

    const user = await User.findById(userId);
    if (!user) {
      fs.unlinkSync(req.file.path); // Delete the uploaded file if user not found
      return res.status(404).json({ error: 'User not found' });
    }

    user.profilePicture = `/uploads/profile_pictures/${req.file.filename}`;
    await user.save();

    res.status(200).json({ 
      message: 'Profile picture uploaded successfully', 
      profilePicture: user.profilePicture // Send back the path of the uploaded image
    });
  } catch (error) {
    console.error('Error uploading profile picture:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
