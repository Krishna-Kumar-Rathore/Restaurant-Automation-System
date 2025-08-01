// middleware/auth.js (Simplified - No JWT)
const User = require('../models/User');

const auth = async (req, res, next) => {
  try {
    // Simple session-based authentication using userId in headers
    const userId = req.header('user-id');
    
    if (!userId) {
      return res.status(401).json({ message: 'No user ID provided, authorization denied' });
    }

    const user = await User.findById(userId).select('-password');
    
    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Authorization failed' });
  }
};

const adminAuth = async (req, res, next) => {
  try {
    await auth(req, res, () => {});
    
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Admin access required' });
    }
    
    next();
  } catch (error) {
    res.status(401).json({ message: 'Admin authorization failed' });
  }
};

module.exports = { auth, adminAuth };