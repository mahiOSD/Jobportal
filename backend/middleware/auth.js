import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const auth = (allowedRoles) => (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    console.log('No authorization header provided');
    return res.status(403).json({ message: 'No authorization header provided' });
  }
  const token = authHeader.split(' ')[1];
  if (!token) {
    console.log('No token provided');
    return res.status(403).json({ message: 'No token provided' });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    console.log('Decoded User:', req.user);
    if (!allowedRoles.includes(req.user.category)) {
      console.log('Insufficient permissions');
      return res.status(403).json({ message: 'Insufficient permissions' });
    }
    next();
  } catch (error) {
    console.log('Invalid token:', error);
    return res.status(403).json({ message: 'Invalid token' });
  }
};



export default auth;
