const express = require('express');
const router = express.Router();
const Doctor = require('../models/Doctor');
const User = require('../models/User');
const { protect, adminOnly } = require('../middleware/auth');

// GET all doctors (public - for patient dropdown and doctors tab)
router.get('/',  async (req, res) => {
  try {
    console.log('[Doctors] Fetching all doctors...');
    
    const doctors = await Doctor.find({ isActive: true })
      .populate('userId', 'firstName lastName email phone')
      .select('userId specialization qualifications yearsOfExperience consultationFee bio rating');

    console.log('[Doctors] Found:', doctors.length, 'active doctors');
    
    res.json({
      success: true,
      data: doctors,
      message: 'Doctors fetched successfully'
    });

  } catch (error) {
    console.error('[Error] Get doctors:', error.message);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch doctors: ' + error.message
    });
  }
});

//  GET doctor by ID
router.get('/:id', protect, async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id)
      .populate('userId', 'firstName lastName email phone');

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: 'Doctor not found'
      });
    }

    res.json({
      success: true,
      data: doctor,
      message: 'Doctor fetched successfully'
    });

  } catch (error) {
    console.error('[Error] Get doctor:', error.message);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch doctor: ' + error.message
    });
  }
});

//  CREATE doctor (admin only)
router.post('/', protect, adminOnly, async (req, res) => {
  try {
    const { userId, specialization, qualifications, yearsOfExperience, licenseNumber, consultationFee, bio } = req.body;

    // Validate required fields
    if (!userId || !specialization || !qualifications || !yearsOfExperience || !licenseNumber || !consultationFee) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields'
      });
    }

    // Check if doctor already exists
    const existingDoctor = await Doctor.findOne({ userId });
    if (existingDoctor) {
      return res.status(400).json({
        success: false,
        message: 'Doctor already registered'
      });
    }

    const doctor = new Doctor({
      userId,
      specialization,
      qualifications,
      yearsOfExperience,
      licenseNumber,
      consultationFee,
      bio,
      isActive: true
    });

    await doctor.save();

    res.status(201).json({
      success: true,
      data: doctor,
      message: 'Doctor created successfully'
    });

  } catch (error) {
    console.error('[Error] Create doctor:', error.message);
    res.status(500).json({
      success: false,
      message: 'Failed to create doctor: ' + error.message
    });
  }
});

// UPDATE doctor (admin only)
router.put('/:id', protect, adminOnly, async (req, res) => {
  try {
    const { specialization, qualifications, yearsOfExperience, consultationFee, bio, isActive } = req.body;

    const doctor = await Doctor.findByIdAndUpdate(
      req.params.id,
      {
        specialization,
        qualifications,
        yearsOfExperience,
        consultationFee,
        bio,
        isActive,
        updatedAt: Date.now()
      },
      { new: true, runValidators: true }
    ).populate('userId', 'firstName lastName email phone');

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: 'Doctor not found'
      });
    }

    res.json({
      success: true,
      data: doctor,
      message: 'Doctor updated successfully'
    });

  } catch (error) {
    console.error('[Error] Update doctor:', error.message);
    res.status(500).json({
      success: false,
      message: 'Failed to update doctor: ' + error.message
    });
  }
});

// DELETE doctor (admin only)
router.delete('/:id', protect, adminOnly, async (req, res) => {
  try {
    const doctor = await Doctor.findByIdAndDelete(req.params.id);

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: 'Doctor not found'
      });
    }

    res.json({
      success: true,
      message: 'Doctor deleted successfully'
    });

  } catch (error) {
    console.error('[Error] Delete doctor:', error.message);
    res.status(500).json({
      success: false,
      message: 'Failed to delete doctor: ' + error.message
    });
  }
});

// GET doctors list (alternative endpoint)
router.get('/list/all', protect, async (req, res) => {
  try {
    const doctors = await Doctor.find({ isActive: true })
      .populate('userId', 'firstName lastName email phone')
      .lean();

    res.json({
      success: true,
      data: doctors
    });

  } catch (error) {
    console.error('[Error] Get doctors list:', error.message);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch doctors'
    });
  }
});

module.exports = router;