
const express = require('express');
const Patient = require('../models/Patient');
const User = require('../models/User');
const { protect, adminOnly } = require('../middleware/auth');

const router = express.Router();

// Get all patients (admin and doctor only)
router.get('/', protect, adminOnly, async (req, res) => {
  try {
    const patients = await Patient.find().populate('userId', 'firstName lastName email phone');
    return res.json({ success: true, message: 'Patients retrieved', data: patients });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

// Get patient by ID
router.get('/:id', protect, async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id).populate('userId');
    if (!patient) {
      return res.status(404).json({ success: false, message: 'Patient not found' });
    }
    return res.json({ success: true, message: 'Patient retrieved', data: patient });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

// Update patient profile
router.put('/:id', protect, async (req, res) => {
  try {
    const patient = await Patient.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!patient) {
      return res.status(404).json({ success: false, message: 'Patient not found' });
    }

    return res.json({ success: true, message: 'Patient updated', data: patient });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

// Delete patient (admin only)
router.delete('/:id', protect, adminOnly, async (req, res) => {
  try {
    await Patient.findByIdAndDelete(req.params.id);
    return res.json({ success: true, message: 'Patient deleted' });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;