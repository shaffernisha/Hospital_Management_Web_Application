const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Patient = require('../models/Patient');
const Doctor = require('../models/Doctor');
const jwt = require('jsonwebtoken');
const { protect } = require('../middleware/auth');
// REGISTER
router.post('/register', async (req, res) => {
  try {
    console.log('[Auth] -Register attempt');
    const { email, password, firstName, lastName, phone, role } = req.body;

    // Validate all required fields
    if (!email || !password || !firstName || !lastName || !phone || !role) {
      console.log('[Auth] - Missing required fields');
      return res.status(400).json({ 
        success: false, 
        message: 'All fields are required' 
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log('[Auth] - User already exists:', email);
      return res.status(400).json({ 
        success: false, 
        message: 'User already exists' 
      });
    }

    console.log('[Auth] - Creating user...');
    
    // Create new user - password will be hashed automatically by pre-save hook
    const newUser = new User({
      email,
      password,  // ← DO NOT hash here, mongoose pre-save will do it
      firstName,
      lastName,
      phone,
      role: role || 'patient'
    });

    console.log('[Auth] -Saving to database...');
    await newUser.save();
    console.log('[Auth] -User saved successfully');

    // ✅ CREATE ROLE-SPECIFIC PROFILE WITH ALL REQUIRED FIELDS
    if (newUser.role === 'patient') {
      console.log('[Auth] Creating patient profile...');
      const patient = new Patient({
        userId: newUser._id,
        bloodGroup: '',
        address: '',
        city: ''
      });
      await patient.save();
      console.log('[Auth] - Patient profile created:', patient._id);
    } else if (newUser.role === 'doctor') {
      console.log('[Auth] Creating doctor profile...');
      const doctor = new Doctor({
        userId: newUser._id,
        specialization: '',
        yearsOfExperience: 0,
        qualifications: '',
        consultationFee: 500,
        licenseNumber: `LIC-${Date.now()}`,
        isActive: true,
        isVerified: false
      });
      await doctor.save();
      console.log('[Auth] - Doctor profile created:', doctor._id);
    }

    console.log('[Auth] - Registration complete:', email);

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: {
        userId: newUser._id,
        email: newUser.email,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        role: newUser.role
      }
    });

  } catch (error) {
    console.error('[Auth] - Register error:', error.message);
    res.status(500).json({ 
      success: false, 
      message: 'Registration failed: ' + error.message 
    });
  }
});
// LOGIN
router.post('/login', async (req, res) => {
  try {
    console.log('[Auth] 🔐 Login attempt');
    const { email, password } = req.body;

    if (!email || !password) {
      console.log('[Auth] - Missing email or password');
      return res.status(400).json({ 
        success: false, 
        message: 'Email and password are required' 
      });
    }

    // Find user and include password field 
    const user = await User.findOne({ email }).select('+password');
    
    if (!user) {
      console.log('[Auth] - User not found:', email);
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid email or password' 
      });
    }

    console.log('[Auth] -User found:', email);

    // Use the schema method to compare passwords
    const isPasswordValid = await user.matchPassword(password);
    
    if (!isPasswordValid) {
      console.log('[Auth] - Invalid password');
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid email or password' 
      });
    }

    console.log('[Auth] -Password valid');

    //  ENSURE PATIENT PROFILE EXISTS 
    if (user.role === 'patient') {
      try {
        const existingPatient = await Patient.findOne({ userId: user._id });
        if (!existingPatient) {
          console.log('[Auth]- Patient profile missing for user:', user._id);
          const patient = new Patient({
            userId: user._id,
            bloodGroup: '',
            address: '',
            city: ''
          });
          await patient.save();
          console.log('[Auth] - Patient profile created for existing user');
        }
      } catch (patientError) {
        console.warn('[Auth] Could not ensure patient profile:', patientError.message);
      }
    }

    // ENSURE DOCTOR PROFILE EXISTS (for existing users who don't have one)
    if (user.role === 'doctor') {
      try {
        const existingDoctor = await Doctor.findOne({ userId: user._id });
        if (!existingDoctor) {
          console.log('[Auth] -Doctor profile missing for user:', user._id);
          const doctor = new Doctor({
            userId: user._id,
            specialization: '',
            yearsOfExperience: 0,
            qualifications: '',
            consultationFee: 500,
            licenseNumber: `LIC-${Date.now()}`,
            isActive: true,
            isVerified: false
          });
          await doctor.save();
          console.log('[Auth] -Doctor profile created for existing user');
        }
      } catch (doctorError) {
        console.warn('[Auth] Could not ensure doctor profile:', doctorError.message);
      
      }
    }

    // Create JWT token
    const JWT_SECRET = process.env.JWT_SECRET || 'healnow-super-secret-key-change-this-in-production-use-strong-random-string';
    
    const token = jwt.sign(
      { 
        id: user._id.toString(),
        email: user.email,
        role: user.role
      },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    console.log('[Auth] -Token created');
    console.log('[Auth]- Login successful for:', email);

    res.json({
      success: true,
      message: 'Login successful',
      data: {
        token,
        user: {
          _id: user._id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          phone: user.phone,
          role: user.role
        }
      }
    });

  } catch (error) {
    console.error('[Auth]- Login error:', error.message);
    res.status(500).json({ 
      success: false, 
      message: 'Login failed: ' + error.message 
    });
  }
});
// GET CURRENT USER
router.get('/me', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    
    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: 'User not found' 
      });
    }

    res.json({
      success: true,
      data: user
    });

  } catch (error) {
    console.error('[Auth] -Get user error:', error.message);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to get user' 
    });
  }
});
// LOGOUT
router.post('/logout', protect, async (req, res) => {
  res.json({
    success: true,
    message: 'Logged out successfully'
  });
});

module.exports = router;