const jwt = require('jsonwebtoken');
const User = require('../models/User');
// PROTECT MIDDLEWARE - BULLETPROOF VERSION
const protect = async (req, res, next) => {
  try {
    console.log('[Auth]  Protect middleware triggered');
    console.log('[Auth] Headers:', req.headers);

    // Get token from Authorization header
    const authHeader = req.headers.authorization;
    console.log('[Auth] Authorization header:', authHeader);

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      console.log('[Auth] - No bearer token found');
      return res.status(401).json({ 
        success: false, 
        message: 'No authorization token found' 
      });
    }

    // Extract token
    const token = authHeader.substring(7); 
    console.log('[Auth] Token extracted:', token.substring(0, 20) + '...');

    if (!token) {
      console.log('[Auth]  Token is empty');
      return res.status(401).json({ 
        success: false, 
        message: 'Token is empty' 
      });
    }

    // Verify token
    const JWT_SECRET = process.env.JWT_SECRET || '608166ff480b986131d93f1c70913dbcd01b39d52fd6e7cac9e8e609d1c561ed';
    console.log('[Auth] Verifying with JWT_SECRET:', JWT_SECRET.substring(0, 10) + '...');

    let decoded;
    try {
      decoded = jwt.verify(token, JWT_SECRET);
      console.log('[Auth]  Token verified');
      console.log('[Auth] Decoded user ID:', decoded.id);
    } catch (error) {
      console.log('[Auth]  Token verification failed:', error.message);
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid token: ' + error.message 
      });
    }

    // Get user from database
    const user = await User.findById(decoded.id);
    
    if (!user) {
      console.log('[Auth]  User not found in database with ID:', decoded.id);
      return res.status(401).json({ 
        success: false, 
        message: 'User not found' 
      });
    }

    console.log('[Auth] -User found:', user.email);

    // Attach user to request
    req.user = {
      id: user._id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      phone: user.phone,
      role: user.role
    };

    console.log('[Auth] -User attached to req:', req.user.email, req.user.role);
    console.log('[Auth] - Protect middleware complete\n');

    next();

  } catch (error) {
    console.error('[Auth] - Protect middleware error:', error.message);
    console.error('[Auth] Stack:', error.stack);
    res.status(500).json({ 
      success: false, 
      message: 'Auth middleware error: ' + error.message 
    });
  }
};
// PATIENT ONLY MIDDLEWARE
const patientOnly = (req, res, next) => {
  if (req.user.role !== 'patient') {
    return res.status(403).json({ 
      success: false, 
      message: 'Only patients can access this resource' 
    });
  }
  next();
};
// DOCTOR ONLY MIDDLEWARE
const doctorOnly = (req, res, next) => {
  if (req.user.role !== 'doctor') {
    return res.status(403).json({ 
      success: false, 
      message: 'Only doctors can access this resource' 
    });
  }
  next();
};
// ADMIN ONLY MIDDLEWARE
const adminOnly = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ 
      success: false, 
      message: 'Only admins can access this resource' 
    });
  }
  next();
};

module.exports = {
  protect,
  patientOnly,
  doctorOnly,
  adminOnly
};
