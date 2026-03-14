const mongoose = require('mongoose');
// Patient medical history and health records

const medicalHistorySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    height: {
      type: String,
      default: ''
    },
    weight: {
      type: String,
      default: ''
    },
    bloodPressure: {
      type: String,
      default: ''
    },
    bloodGroup: {
      type: String,
      default: ''
    },
    chronicDiseases: {
      type: String,
      default: ''
    },
    surgeries: {
      type: String,
      default: ''
    },
    injuries: {
      type: String,
      default: ''
    },
    medicineAllergies: {
      type: String,
      default: ''
    },
    foodAllergies: {
      type: String,
      default: ''
    },
    otherAllergies: {
      type: String,
      default: ''
    },
    currentMedications: {
      type: String,
      default: ''
    },
    smokingStatus: {
      type: String,
      enum: ['never', 'former', 'current', ''],
      default: ''
    },
    alcoholConsumption: {
      type: String,
      enum: ['none', 'moderate', 'heavy', ''],
      default: ''
    },
    exerciseFrequency: {
      type: String,
      enum: ['sedentary', 'light', 'moderate', 'intense', ''],
      default: ''
    },
    familyHistory: {
      type: String,
      default: ''
    },
    healthRecords: {
      type: String,
      default: ''
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('MedicalHistory', medicalHistorySchema);