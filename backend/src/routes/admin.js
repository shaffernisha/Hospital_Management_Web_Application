const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

const User = require('../models/User');
const Doctor = require('../models/Doctor');
const Patient = require('../models/Patient');
const Appointment = require('../models/Appointment');
const { protect, adminOnly } = require('../middleware/auth');
const { sendEmail, doctorRegistrationEmail } = require('../../config/emailConfig');

//STATS
router.get('/stats', protect, adminOnly, async (req, res) => {
  try {
    console.log('[Admin] Fetching stats...');
    
    const totalDoctors = await Doctor.countDocuments();
    const totalCareSeekers = await Patient.countDocuments();
    const totalAppointments = await Appointment.countDocuments();
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    const todayAppointments = await Appointment.countDocuments({
      appointmentDate: {
        $gte: today.toISOString().split('T')[0],
        $lt: tomorrow.toISOString().split('T')[0]
      }
    });
    
    const completedAppointments = await Appointment.find({ status: 'completed' });
    const totalRevenue = completedAppointments.reduce((sum, apt) => sum + (apt.consultationFee || 0), 0);

    console.log('[Admin] Stats fetched successfully');
    res.json({
      success: true,
      data: {
        totalDoctors,
        totalCareSeekers,
        totalAppointments,
        todayAppointments,
        totalRevenue
      }
    });
  } catch (error) {
    console.error('[Error] Get Stats:', error.message);
    res.status(500).json({ success: false, message: 'Failed to fetch stats: ' + error.message });
  }
});

//DOCTORS

// GET all doctors
router.get('/doctors', protect, adminOnly, async (req, res) => {
  try {
    console.log('[Admin] Fetching doctors...');
    
    const doctors = await Doctor.find()
      .populate('userId', 'firstName lastName email phone')
      .sort({ createdAt: -1 });

    const formattedDoctors = doctors.map(doc => ({
      _id: doc._id,
      userId: doc.userId._id,
      firstName: doc.userId.firstName,
      lastName: doc.userId.lastName,
      email: doc.userId.email,
      phone: doc.userId.phone,
      specialization: doc.specialization,
      experience: doc.yearsOfExperience,
      qualification: doc.qualifications,
      consultationFee: doc.consultationFee,
      licenseNumber: doc.licenseNumber,
      isActive: doc.isActive,
      isVerified: doc.isVerified
    }));

    console.log('[Admin] Doctors fetched:', formattedDoctors.length);
    res.json({
      success: true,
      data: formattedDoctors
    });
  } catch (error) {
    console.error('[Error] Get Doctors:', error.message);
    res.status(500).json({ success: false, message: 'Failed to fetch doctors: ' + error.message });
  }
});

// CREATE doctor
router.post('/create-doctor', protect, adminOnly, async (req, res) => {
  try {
    const { firstName, lastName, email, password, phone, specialization, experience, qualification, consultationFee } = req.body;

    console.log('[Admin] Creating doctor:', email);

    // Validate required fields
    if (!firstName || !lastName || !email || !password || !phone || !specialization || !experience || !qualification || !consultationFee) {
      return res.status(400).json({ success: false, message: 'Missing required fields' });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'Email already registered' });
    }

    // Create user
    const newUser = new User({
      firstName,
      lastName,
      email,
      password,
      phone,
      role: 'doctor'
    });

    await newUser.save();
    console.log('[Admin] User created:', newUser._id);

    // Create doctor profile
    const newDoctor = new Doctor({
      userId: newUser._id,
      specialization,
      yearsOfExperience: parseInt(experience),
      qualifications: qualification,
      consultationFee: parseInt(consultationFee),
      licenseNumber: `LIC-${Date.now()}`,
      isActive: true,
      isVerified: false
    });

    await newDoctor.save();
    console.log('[Admin] Doctor profile created:', newDoctor._id);

    // SEND WELCOME EMAIL TO DOCTOR
    try {
      const emailSubject = 'Welcome to HealNow - Your Doctor Account is Ready!';
      const emailHtml = doctorRegistrationEmail(
        firstName + ' ' + lastName,
        email,
        password
      );

      const emailResult = await sendEmail(email, emailSubject, emailHtml);

      if (emailResult.success) {
        console.log('[Admin] -Welcome email sent to doctor:', email);
      } else {
        console.warn('[Admin]-Email failed but doctor created:', emailResult.error);
      }
    } catch (emailError) {
      console.error('[Admin] Email sending error:', emailError.message);
      // Don't fail doctor creation if email fails
    }

    res.status(201).json({
      success: true,
      message: 'Doctor created successfully',
      data: {
        _id: newDoctor._id,
        firstName,
        lastName,
        email,
        phone,
        specialization,
        experience,
        qualification,
        consultationFee
      }
    });
  } catch (error) {
    console.error('[Error] Create Doctor:', error.message);
    res.status(500).json({ success: false, message: 'Failed to create doctor: ' + error.message });
  }
});

// GET single doctor
router.get('/doctor/:id', protect, adminOnly, async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id).populate('userId');
    if (!doctor) {
      return res.status(404).json({ success: false, message: 'Doctor not found' });
    }
    res.json({ success: true, data: doctor });
  } catch (error) {
    console.error('[Error] Get Doctor:', error.message);
    res.status(500).json({ success: false, message: 'Failed to fetch doctor: ' + error.message });
  }
});

// UPDATE doctor
router.put('/doctor/:id', protect, adminOnly, async (req, res) => {
  try {
    const { firstName, lastName, email, phone, specialization, experience, qualification, consultationFee } = req.body;
    
    const doctor = await Doctor.findById(req.params.id);
    if (!doctor) {
      return res.status(404).json({ success: false, message: 'Doctor not found' });
    }

    // Update user info
    const user = await User.findByIdAndUpdate(
      doctor.userId,
      { firstName, lastName, email, phone },
      { new: true }
    );

    // Update doctor info
    doctor.specialization = specialization;
    doctor.yearsOfExperience = experience;
    doctor.qualifications = qualification;
    doctor.consultationFee = consultationFee;
    await doctor.save();

    res.json({
      success: true,
      message: 'Doctor updated successfully',
      data: doctor
    });
  } catch (error) {
    console.error('[Error] Update Doctor:', error.message);
    res.status(500).json({ success: false, message: 'Failed to update doctor: ' + error.message });
  }
});

// DELETE doctor
router.delete('/doctor/:id', protect, adminOnly, async (req, res) => {
  try {
    console.log('[Admin] Deleting doctor:', req.params.id);
    
    const doctor = await Doctor.findById(req.params.id);
    if (!doctor) {
      return res.status(404).json({ success: false, message: 'Doctor not found' });
    }

    // Delete associated user
    await User.findByIdAndDelete(doctor.userId);
    
    // Delete doctor
    await Doctor.findByIdAndDelete(req.params.id);

    console.log('[Admin] Doctor deleted successfully');
    res.json({ success: true, message: 'Doctor deleted successfully' });
  } catch (error) {
    console.error('[Error] Delete Doctor:', error.message);
    res.status(500).json({ success: false, message: 'Failed to delete doctor: ' + error.message });
  }
});

//CARE SEEKERS (PATIENTS)

// GET all care seekers
router.get('/seekers', protect, adminOnly, async (req, res) => {
  try {
    console.log('[Admin] Fetching care seekers...');
    
    const patients = await Patient.find()
      .populate('userId', 'firstName lastName email phone createdAt')
      .sort({ createdAt: -1 });

    const formattedPatients = patients.map(patient => ({
      _id: patient._id,
      userId: patient.userId._id,
      firstName: patient.userId.firstName,
      lastName: patient.userId.lastName,
      email: patient.userId.email,
      phone: patient.userId.phone,
      bloodGroup: patient.bloodGroup,
      address: patient.address,
      city: patient.city,
      createdAt: patient.userId.createdAt
    }));

    console.log('[Admin] Care seekers fetched:', formattedPatients.length);
    res.json({
      success: true,
      data: formattedPatients
    });
  } catch (error) {
    console.error('[Error] Get Seekers:', error.message);
    res.status(500).json({ success: false, message: 'Failed to fetch care seekers: ' + error.message });
  }
});

// GET single seeker
router.get('/seeker/:id', protect, adminOnly, async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id).populate('userId');
    if (!patient) {
      return res.status(404).json({ success: false, message: 'Care seeker not found' });
    }
    res.json({ success: true, data: patient });
  } catch (error) {
    console.error('[Error] Get Seeker:', error.message);
    res.status(500).json({ success: false, message: 'Failed to fetch care seeker: ' + error.message });
  }
});

// DELETE seeker
router.delete('/seeker/:id', protect, adminOnly, async (req, res) => {
  try {
    console.log('[Admin] Deleting care seeker:', req.params.id);
    
    const patient = await Patient.findById(req.params.id);
    if (!patient) {
      return res.status(404).json({ success: false, message: 'Care seeker not found' });
    }

    // Delete associated user
    await User.findByIdAndDelete(patient.userId);
    
    // Delete patient
    await Patient.findByIdAndDelete(req.params.id);

    console.log('[Admin] Care seeker deleted successfully');
    res.json({ success: true, message: 'Care seeker deleted successfully' });
  } catch (error) {
    console.error('[Error] Delete Seeker:', error.message);
    res.status(500).json({ success: false, message: 'Failed to delete care seeker: ' + error.message });
  }
});

// APPOINTMENTS 

// GET all appointments
router.get('/appointments', protect, adminOnly, async (req, res) => {
  try {
    console.log('[Admin] Fetching appointments...');
    
    const appointments = await Appointment.find()
      .populate({
        path: 'patientId',
        populate: { path: 'userId', select: 'firstName lastName email' }
      })
      .populate({
        path: 'doctorId',
        populate: { path: 'userId', select: 'firstName lastName email' }
      })
      .sort({ appointmentDate: -1, appointmentTime: -1 });

    const formattedAppointments = appointments.map(apt => ({
      _id: apt._id,
      patientName: `${apt.patientId.userId.firstName} ${apt.patientId.userId.lastName}`,
      patientEmail: apt.patientId.userId.email,
      doctorName: `${apt.doctorId.userId.firstName} ${apt.doctorId.userId.lastName}`,
      doctorEmail: apt.doctorId.userId.email,
      appointmentDate: apt.appointmentDate,
      appointmentTime: apt.appointmentTime,
      status: apt.status,
      reason: apt.reason,
      consultationFee: apt.consultationFee,
      createdAt: apt.createdAt
    }));

    console.log('[Admin] Appointments fetched:', formattedAppointments.length);
    res.json({
      success: true,
      data: formattedAppointments
    });
  } catch (error) {
    console.error('[Error] Get Appointments:', error.message);
    res.status(500).json({ success: false, message: 'Failed to fetch appointments: ' + error.message });
  }
});

// UPDATE appointment status
router.put('/appointment/:id', protect, adminOnly, async (req, res) => {
  try {
    const { status } = req.body;
    
    if (!['pending', 'confirmed', 'completed', 'cancelled'].includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid status' });
    }

    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      { status, updatedAt: Date.now() },
      { new: true }
    );

    if (!appointment) {
      return res.status(404).json({ success: false, message: 'Appointment not found' });
    }

    console.log('[Admin] Appointment status updated:', req.params.id);
    res.json({ success: true, message: 'Appointment updated', data: appointment });
  } catch (error) {
    console.error('[Error] Update Appointment:', error.message);
    res.status(500).json({ success: false, message: 'Failed to update appointment: ' + error.message });
  }
});

// DELETE appointment
router.delete('/appointment/:id', protect, adminOnly, async (req, res) => {
  try {
    console.log('[Admin] Deleting appointment:', req.params.id);
    
    const appointment = await Appointment.findByIdAndDelete(req.params.id);
    if (!appointment) {
      return res.status(404).json({ success: false, message: 'Appointment not found' });
    }

    console.log('[Admin] Appointment deleted successfully');
    res.json({ success: true, message: 'Appointment deleted successfully' });
  } catch (error) {
    console.error('[Error] Delete Appointment:', error.message);
    res.status(500).json({ success: false, message: 'Failed to delete appointment: ' + error.message });
  }
});

// ==================== DASHBOARD ====================

router.get('/dashboard', protect, adminOnly, async (req, res) => {
  try {
    console.log('[Admin] Fetching dashboard data...');
    
    const totalDoctors = await Doctor.countDocuments();
    const totalPatients = await Patient.countDocuments();
    const totalAppointments = await Appointment.countDocuments();
    const totalCompleted = await Appointment.countDocuments({ status: 'completed' });
    const totalCancelled = await Appointment.countDocuments({ status: 'cancelled' });
    
    console.log('[Admin] Dashboard data fetched');
    res.json({
      success: true,
      data: {
        totalDoctors,
        totalPatients,
        totalAppointments,
        totalCompleted,
        totalCancelled
      }
    });
  } catch (error) {
    console.error('[Error] Dashboard:', error.message);
    res.status(500).json({ success: false, message: 'Failed to fetch dashboard: ' + error.message });
  }
});

module.exports = router;