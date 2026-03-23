
// PRESCRIPTION MODEL
const mongoose = require('mongoose');

const prescriptionSchema = new mongoose.Schema({
  appointmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Appointment',
    required: true
  },
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
  //  Array of medicines
  medicines: [{
    name: {
      type: String,
      required: true
    },
    dosage: {
      type: String,
      required: true,
      example: '500mg'
    },
    frequency: {
      type: String,
      required: true,
      example: 'Twice a day'
    },
    duration: {
      type: String,
      required: true,
      example: '7 days'
    },
    notes: {
      type: String,
      default: null,
      example: 'Take with food'
    }
  }],
  // Diagnosis
  diagnosis: {
    type: String,
    required: true
  },
  // Doctor's instructions
  instructions: {
    type: String,
    default: null
  },
  //  Follow-up appointment
  followUpDate: {
    type: Date,
    default: null
  },
  //  Patient sharing status
  sharedWithPatient: {
    type: Boolean,
    default: false
  },
  sharedDate: {
    type: Date,
    default: null
  },
  //  Lab tests if needed
  labTests: [{
    testName: String,
    testDate: Date,
    result: String
  }],
  
  issuedDate: {
    type: Date,
    default: Date.now
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

module.exports = mongoose.model('Prescription', prescriptionSchema);
