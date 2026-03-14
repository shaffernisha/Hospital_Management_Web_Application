const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointment');
const Doctor = require('../models/Doctor');
const Patient = require('../models/Patient');
const { protect } = require('../middleware/auth');
const { sendEmail, appointmentConfirmationEmail } = require('../../config/emailConfig');

//CREATE APPOINTMENT
router.post('/', protect, async (req, res) => {
  try {
    const { doctorId, appointmentDate, appointmentTime, reason } = req.body;

    console.log('[Appointment] Creating appointment for user:', req.user.id);

    // Validate required fields
    if (!doctorId || !appointmentDate || !appointmentTime || !reason) {
      return res.status(400).json({ success: false, message: 'Missing required fields' });
    }

    // Find patient
    const patient = await Patient.findOne({ userId: req.user.id });
    if (!patient) {
      return res.status(404).json({ success: false, message: 'Patient profile not found' });
    }

    // Find doctor and get consultation fee
    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
      return res.status(404).json({ success: false, message: 'Doctor not found' });
    }

    // Create appointment with status "pending"
    const newAppointment = new Appointment({
      patientId: patient._id,
      doctorId: doctorId,
      appointmentDate,
      appointmentTime,
      reason,
      consultationFee: doctor.consultationFee,
      status: 'pending'
    });

    await newAppointment.save();
    console.log('[Appointment] Appointment created:', newAppointment._id);

    // SEND CONFIRMATION EMAIL
    try {
      const doctorDetails = await Doctor.findById(doctorId).populate('userId');
      const patientDetails = await Patient.findOne({ userId: req.user.id }).populate('userId');

      const emailSubject = 'Appointment Confirmation - HealNow Healthcare';
      const emailHtml = appointmentConfirmationEmail(
        patientDetails.userId.firstName + ' ' + patientDetails.userId.lastName,
        doctorDetails.userId.firstName + ' ' + doctorDetails.userId.lastName,
        appointmentDate,
        appointmentTime,
        doctor.consultationFee
      );

      const emailResult = await sendEmail(
        patientDetails.userId.email,
        emailSubject,
        emailHtml
      );

      if (emailResult.success) {
        console.log('[Appointment] -Confirmation email sent to:', patientDetails.userId.email);
      } else {
        console.warn('[Appointment] -Email failed but appointment created:', emailResult.error);
      }
    } catch (emailError) {
      console.error('[Appointment] Email sending error:', emailError.message);
    }

    res.status(201).json({
      success: true,
      message: 'Appointment booked successfully',
      data: newAppointment
    });
  } catch (error) {
    console.error('[Error] Create Appointment:', error.message);
    res.status(500).json({ success: false, message: 'Failed to create appointment: ' + error.message });
  }
});

// CONFIRM APPOINTMENT (Doctor only)
router.put('/:id/confirm', protect, async (req, res) => {
  try {
    const appointmentId = req.params.id;

    console.log('[Appointment] Confirming appointment:', appointmentId);
    console.log('[Appointment] User role:', req.user.role);

    // Only doctors can confirm
    if (req.user.role !== 'doctor') {
      return res.status(403).json({ success: false, message: 'Only doctors can confirm appointments' });
    }

    // Find appointment
    const appointment = await Appointment.findById(appointmentId);
    if (!appointment) {
      return res.status(404).json({ success: false, message: 'Appointment not found' });
    }

    // Verify this doctor owns this appointment
    const doctor = await Doctor.findOne({ userId: req.user.id });
    if (!doctor || appointment.doctorId.toString() !== doctor._id.toString()) {
      return res.status(403).json({ success: false, message: 'Not authorized to confirm this appointment' });
    }

    // Update status to confirmed
    appointment.status = 'confirmed';
    appointment.updatedAt = new Date();
    await appointment.save();

    console.log('[Appointment] -Appointment confirmed:', appointmentId);

    // Send confirmation email to patient
    try {
      const patient = await Patient.findById(appointment.patientId).populate('userId');
      const doctorDetails = await Doctor.findById(appointment.doctorId).populate('userId');

      if (patient && patient.userId.email) {
        const emailSubject = 'Your Appointment Has Been Confirmed - HealNow Healthcare';
        const emailHtml = `
          <h2>Appointment Confirmed</h2>
          <p>Dear ${patient.userId.firstName},</p>
          <p>Your appointment has been confirmed by Dr. ${doctorDetails.userId.firstName} ${doctorDetails.userId.lastName}.</p>
          <p><strong>Appointment Details:</strong></p>
          <ul>
            <li>Doctor: Dr. ${doctorDetails.userId.firstName} ${doctorDetails.userId.lastName}</li>
            <li>Specialization: ${doctorDetails.specialization}</li>
            <li>Date: ${new Date(appointment.appointmentDate).toLocaleDateString()}</li>
            <li>Time: ${appointment.appointmentTime}</li>
            <li>Status: <strong style="color: green;">Confirmed</strong></li>
          </ul>
          <p>Please arrive 10 minutes before your appointment time.</p>
          <p>Best regards,<br>HealNow Healthcare Team</p>
        `;

        await sendEmail(patient.userId.email, emailSubject, emailHtml);
        console.log('[Appointment] - Confirmation email sent to patient');
      }
    } catch (emailError) {
      console.warn('[Appointment] Could not send confirmation email:', emailError.message);
    }

    res.json({
      success: true,
      message: 'Appointment confirmed successfully',
      data: appointment
    });
  } catch (error) {
    console.error('[Error] Confirm Appointment:', error.message);
    res.status(500).json({ success: false, message: 'Failed to confirm appointment: ' + error.message });
  }
});

// GET ALL APPOINTMENTS (User's own appointments) - WITH NULL CHECKS
router.get('/', protect, async (req, res) => {
  try {
    console.log('[Appointment] Fetching appointments for user:', req.user.id);

    let appointments = [];

    // If admin, get all appointments
    if (req.user.role === 'admin') {
      appointments = await Appointment.find()
        .populate({
          path: 'patientId',
          populate: { path: 'userId', select: 'firstName lastName email' }
        })
        .populate({
          path: 'doctorId',
          populate: { path: 'userId', select: 'firstName lastName email' }
        })
        .sort({ appointmentDate: -1, appointmentTime: -1 });
    } else if (req.user.role === 'patient') {
      // Get patient's appointments
      const patient = await Patient.findOne({ userId: req.user.id });
      
      if (!patient) {
        console.log('[Appointment] - Patient profile not found for user:', req.user.id);
        return res.json({ success: true, data: [] });
      }
      
      appointments = await Appointment.find({ patientId: patient._id })
        .populate({
          path: 'doctorId',
          populate: { path: 'userId', select: 'firstName lastName email specialization' }
        })
        .sort({ appointmentDate: -1, appointmentTime: -1 });
    } else if (req.user.role === 'doctor') {
      // Get doctor's appointments
      const doctor = await Doctor.findOne({ userId: req.user.id });
      
      if (!doctor) {
        console.log('[Appointment] -Doctor profile not found for user:', req.user.id);
        return res.json({ success: true, data: [] });
      }
      
      appointments = await Appointment.find({ doctorId: doctor._id })
        .populate({
          path: 'patientId',
          populate: { path: 'userId', select: 'firstName lastName email phone' }
        })
        .sort({ appointmentDate: -1, appointmentTime: -1 });
    }

    console.log('[Appointment] Fetched:', appointments.length);
    res.json({ success: true, data: appointments });
  } catch (error) {
    console.error('[Error] Get Appointments:', error.message);
    res.status(500).json({ success: false, message: 'Failed to fetch appointments: ' + error.message });
  }
});

// GET USER'S APPOINTMENTS (Specific endpoint)
router.get('/user/my-appointments', protect, async (req, res) => {
  try {
    if (req.user.role === 'patient') {
      const patient = await Patient.findOne({ userId: req.user.id });
      const appointments = await Appointment.find({ patientId: patient._id })
        .populate({
          path: 'doctorId',
          populate: { path: 'userId' }
        })
        .sort({ appointmentDate: -1 });

      return res.json({ success: true, data: appointments });
    }

    res.status(403).json({ success: false, message: 'Not authorized' });
  } catch (error) {
    console.error('[Error] Get My Appointments:', error.message);
    res.status(500).json({ success: false, message: 'Failed to fetch appointments: ' + error.message });
  }
});

//  GET SINGLE APPOINTMENT
router.get('/:id', protect, async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id)
      .populate({
        path: 'patientId',
        populate: { path: 'userId' }
      })
      .populate({
        path: 'doctorId',
        populate: { path: 'userId' }
      });

    if (!appointment) {
      return res.status(404).json({ success: false, message: 'Appointment not found' });
    }

    res.json({ success: true, data: appointment });
  } catch (error) {
    console.error('[Error] Get Appointment:', error.message);
    res.status(500).json({ success: false, message: 'Failed to fetch appointment: ' + error.message });
  }
});

// UPDATE APPOINTMENT
router.put('/:id', protect, async (req, res) => {
  try {
    const { status, reason } = req.body;

    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) {
      return res.status(404).json({ success: false, message: 'Appointment not found' });
    }

    // Only doctors and admins can update
    if (req.user.role !== 'doctor' && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Not authorized to update' });
    }

    if (status) appointment.status = status;
    if (reason) appointment.reason = reason;

    await appointment.save();
    console.log('[Appointment] Updated:', appointment._id);

    res.json({ success: true, message: 'Appointment updated', data: appointment });
  } catch (error) {
    console.error('[Error] Update Appointment:', error.message);
    res.status(500).json({ success: false, message: 'Failed to update appointment: ' + error.message });
  }
});

//  CANCEL APPOINTMENT
router.delete('/:id', protect, async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) {
      return res.status(404).json({ success: false, message: 'Appointment not found' });
    }

    // Only patient or admin can cancel
    const patient = await Patient.findById(appointment.patientId);
    if (req.user.role !== 'admin' && patient.userId.toString() !== req.user.id) {
      return res.status(403).json({ success: false, message: 'Not authorized to cancel' });
    }

    appointment.status = 'cancelled';
    await appointment.save();

    console.log('[Appointment] Cancelled:', appointment._id);
    res.json({ success: true, message: 'Appointment cancelled' });
  } catch (error) {
    console.error('[Error] Cancel Appointment:', error.message);
    res.status(500).json({ success: false, message: 'Failed to cancel appointment: ' + error.message });
  }
});

module.exports = router;