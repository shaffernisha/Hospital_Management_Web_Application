const express = require('express');
const router = express.Router();
const Prescription = require('../models/Prescription');
const Appointment = require('../models/Appointment');
const Doctor = require('../models/Doctor');
const Patient = require('../models/Patient');
const User = require('../models/User');
const { protect, doctorOnly, patientOnly } = require('../middleware/auth');
const { generatePrescriptionPDF } = require('../utils/prescriptionPDF');
const { sendPrescriptionEmail } = require('../services/emailService');

// POST: Create prescription (doctor only)
router.post('/create', protect, doctorOnly, async (req, res) => {
  try {
    const { appointmentId, patientId, diagnosis, medicines, instructions, followUpDate } = req.body;

    if (!appointmentId || !patientId || !diagnosis || !medicines || medicines.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: appointmentId, patientId, diagnosis, medicines'
      });
    }

    const doctor = await Doctor.findOne({ userId: req.user.id });
    if (!doctor) {
      return res.status(404).json({ success: false, message: 'Doctor profile not found' });
    }

    const prescription = new Prescription({
      appointmentId,
      patientId,
      doctorId: doctor._id,
      diagnosis,
      medicines,
      instructions,
      followUpDate: followUpDate || null,
      issuedDate: new Date()
    });

    await prescription.save();

    // Update appointment status to completed
    await Appointment.findByIdAndUpdate(appointmentId, {
      status: 'completed',
      prescriptionId: prescription._id,
      updatedAt: new Date()
    });

    console.log('[Prescription] Created:', prescription._id);

    res.status(201).json({
      success: true,
      message: 'Prescription created successfully',
      data: prescription
    });

  } catch (error) {
    console.error('[Error] Create Prescription:', error.message);
    res.status(500).json({
      success: false,
      message: 'Failed to create prescription: ' + error.message
    });
  }
});

// GET: Patient's prescriptions
router.get('/patient', protect, patientOnly, async (req, res) => {
  try {
    const patient = await Patient.findOne({ userId: req.user.id });
    if (!patient) {
      return res.status(404).json({ success: false, message: 'Patient profile not found' });
    }

    const prescriptions = await Prescription.find({ patientId: patient._id })
      .populate({
        path: 'doctorId',
        populate: { path: 'userId', select: 'firstName lastName email' }
      })
      .populate('appointmentId')
      .sort({ issuedDate: -1 });

    res.json({ success: true, data: prescriptions });

  } catch (error) {
    console.error('[Error] Get Patient Prescriptions:', error.message);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch prescriptions'
    });
  }
});

// GET: Doctor's prescriptions
router.get('/doctor', protect, doctorOnly, async (req, res) => {
  try {
    const doctor = await Doctor.findOne({ userId: req.user.id });
    if (!doctor) {
      return res.status(404).json({ success: false, message: 'Doctor profile not found' });
    }

    const prescriptions = await Prescription.find({ doctorId: doctor._id })
      .populate({
        path: 'patientId',
        populate: { path: 'userId', select: 'firstName lastName email' }
      })
      .populate('appointmentId')
      .sort({ issuedDate: -1 });

    res.json({ success: true, data: prescriptions });

  } catch (error) {
    console.error('[Error] Get Doctor Prescriptions:', error.message);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch prescriptions'
    });
  }
});

// GET: Single prescription
router.get('/:id', protect, async (req, res) => {
  try {
    const prescription = await Prescription.findById(req.params.id)
      .populate({
        path: 'doctorId',
        populate: { path: 'userId', select: 'firstName lastName email phone specialization' }
      })
      .populate('appointmentId');

    if (!prescription) {
      return res.status(404).json({ success: false, message: 'Prescription not found' });
    }

    res.json({ success: true, data: prescription });

  } catch (error) {
    console.error('[Error] Get Prescription:', error.message);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch prescription'
    });
  }
});

// GET: Download prescription PDF
router.get('/:id/download', protect, async (req, res) => {
  try {
    const prescription = await Prescription.findById(req.params.id)
      .populate({
        path: 'doctorId',
        populate: { path: 'userId', select: 'firstName lastName phone email specialization' }
      })
      .populate({
        path: 'patientId',
        populate: { path: 'userId', select: 'firstName lastName email phone' }
      });

    if (!prescription) {
      return res.status(404).json({ success: false, message: 'Prescription not found' });
    }

    const pdfBuffer = await generatePrescriptionPDF(prescription);

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="prescription_${prescription._id}.pdf"`);
    res.send(pdfBuffer);

    console.log('[Prescription] PDF Downloaded:', prescription._id);

  } catch (error) {
    console.error('[Error] Download Prescription PDF:', error.message);
    res.status(500).json({
      success: false,
      message: 'Failed to generate PDF: ' + error.message
    });
  }
});

// POST: Share prescription via email
router.post('/:id/share', protect, async (req, res) => {
  try {
    const prescription = await Prescription.findById(req.params.id)
      .populate({
        path: 'doctorId',
        populate: { path: 'userId', select: 'firstName lastName email phone specialization' }
      })
      .populate({
        path: 'patientId',
        populate: { path: 'userId', select: 'firstName lastName email phone' }
      });

    if (!prescription) {
      return res.status(404).json({ success: false, message: 'Prescription not found' });
    }

    const patientEmail = prescription.patientId.userId.email;
    const emailSent = await sendPrescriptionEmail(patientEmail, prescription);

    if (emailSent) {
      await Prescription.findByIdAndUpdate(req.params.id, {
        sharedWithPatient: true,
        sharedDate: new Date()
      });
    }

    res.json({
      success: true,
      message: 'Prescription shared via email',
      data: prescription
    });

    console.log('[Prescription] Shared:', prescription._id);

  } catch (error) {
    console.error('[Error] Share Prescription:', error.message);
    res.status(500).json({
      success: false,
      message: 'Failed to share prescription: ' + error.message
    });
  }
});

// PUT: Update prescription
router.put('/:id', protect, doctorOnly, async (req, res) => {
  try {
    const { diagnosis, medicines, instructions, followUpDate } = req.body;

    const prescription = await Prescription.findByIdAndUpdate(
      req.params.id,
      {
        diagnosis,
        medicines,
        instructions,
        followUpDate,
        updatedAt: new Date()
      },
      { new: true }
    );

    if (!prescription) {
      return res.status(404).json({ success: false, message: 'Prescription not found' });
    }

    res.json({
      success: true,
      message: 'Prescription updated',
      data: prescription
    });

    console.log('[Prescription] Updated:', prescription._id);

  } catch (error) {
    console.error('[Error] Update Prescription:', error.message);
    res.status(500).json({
      success: false,
      message: 'Failed to update prescription: ' + error.message
    });
  }
});

// DELETE: Delete prescription
router.delete('/:id', protect, doctorOnly, async (req, res) => {
  try {
    const prescription = await Prescription.findByIdAndDelete(req.params.id);

    if (!prescription) {
      return res.status(404).json({ success: false, message: 'Prescription not found' });
    }

    res.json({
      success: true,
      message: 'Prescription deleted successfully'
    });

    console.log('[Prescription] Deleted:', req.params.id);

  } catch (error) {
    console.error('[Error] Delete Prescription:', error.message);
    res.status(500).json({
      success: false,
      message: 'Failed to delete prescription'
    });
  }
});

module.exports = router;