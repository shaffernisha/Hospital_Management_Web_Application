const mongoose = require('mongoose');
// Patient profile schema
const patientSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  bloodGroup: {
    type: String,
    default: null
  },
  address: {
    type: String,
    default: null
  },
  city: {
    type: String,
    default: null
  },
  emergencyContactName: {
    type: String,
    default: null
  },
  emergencyContactPhone: {
    type: String,
    default: null
  },
   // Embedded medical history
  medicalHistory: {
    height: String,
    weight: String,
    bloodPressure: String,
    chronicDiseases: String,
    surgeries: String,
    injuries: String,
    medicineAllergies: String,
    foodAllergies: String,
    otherAllergies: String,
    currentMedications: String,
    smokingStatus: String,
    alcoholConsumption: String,
    exerciseFrequency: String,
    familyHistory: String
  },
  // Uploaded health documents
  uploadedDocuments: [
    {
      fileName: String,
      fileUrl: String,
      uploadedDate: {
        type: Date,
        default: Date.now
      }
    }
  ],
  totalAppointments: {
    type: Number,
    default: 0
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
module.exports = mongoose.model('Patient', patientSchema);