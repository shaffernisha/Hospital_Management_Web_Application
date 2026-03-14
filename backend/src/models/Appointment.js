// APPOINTMENT MODEL
const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient',
    required: true
  },
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Doctor',
    required: true
  },
  appointmentDate: {
    type: String,
    required: [true, 'Appointment date is required']
  },
  appointmentTime: {
    type: String,
    required: [true, 'Appointment time is required']
  },
  reason: {
    type: String,
    required: [true, 'Reason is required']
  },
  consultationFee: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'completed', 'cancelled'],
    default: 'pending'
  },
  notes: {
    type: String,
    default: null
  },
  // NEW: Patient symptoms and medical details
  symptoms: {
    type: String,
    default: null
  },
  patientHistory: {
    type: String,
    default: null
  },
  // NEW: Doctor's notes during appointment
  doctorNotes: {
    type: String,
    default: null
  },
  // NEW: Link to prescription
  prescriptionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Prescription',
    default: null
  },
  // NEW: Payment status
  paymentStatus: {
    type: String,
    enum: ['pending', 'completed', 'failed'],
    default: 'pending'
  },
  paymentDate: {
    type: Date,
    default: null
  },
  //  NEW: Email notifications
  emailSent: {
    type: Boolean,
    default: false
  },
  emailSentAt: {
    type: Date,
    default: null
  },
  reminderEmailSent: {
    type: Boolean,
    default: false
  },
  reminderEmailSentAt: {
    type: Date,
    default: null
  },
  
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Auto-populate references when querying
appointmentSchema.pre(/^find/, function(next) {
  if (this.options._recursed) {
    return next();
  }
  this.populate({
    path: 'patientId',
    populate: {
      path: 'userId',
      select: 'firstName lastName email phone'
    }
  });
  next();
});

module.exports = mongoose.model('Appointment', appointmentSchema);