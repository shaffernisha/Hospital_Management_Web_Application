const express = require('express');
const router = express.Router();
const MedicalHistory = require('../models/MedicalHistory');
const User = require('../models/User');
const { protect } = require('../middleware/auth');

// SAVE OR UPDATE MEDICAL HISTORY (Patient)
router.post('/save', protect, async (req, res) => {
  try {
    const {
      height,
      weight,
      bloodPressure,
      bloodGroup,
      chronicDiseases,
      surgeries,
      injuries,
      medicineAllergies,
      foodAllergies,
      otherAllergies,
      currentMedications,
      smokingStatus,
      alcoholConsumption,
      exerciseFrequency,
      familyHistory,
      healthRecords
    } = req.body;

    console.log('[Medical History] Saving for user:', req.user.id);

    let medicalHistory = await MedicalHistory.findOne({ userId: req.user.id });

    if (medicalHistory) {
      // Update existing
      medicalHistory.height = height || medicalHistory.height;
      medicalHistory.weight = weight || medicalHistory.weight;
      medicalHistory.bloodPressure = bloodPressure || medicalHistory.bloodPressure;
      medicalHistory.bloodGroup = bloodGroup || medicalHistory.bloodGroup;
      medicalHistory.chronicDiseases = chronicDiseases || medicalHistory.chronicDiseases;
      medicalHistory.surgeries = surgeries || medicalHistory.surgeries;
      medicalHistory.injuries = injuries || medicalHistory.injuries;
      medicalHistory.medicineAllergies = medicineAllergies || medicalHistory.medicineAllergies;
      medicalHistory.foodAllergies = foodAllergies || medicalHistory.foodAllergies;
      medicalHistory.otherAllergies = otherAllergies || medicalHistory.otherAllergies;
      medicalHistory.currentMedications = currentMedications || medicalHistory.currentMedications;
      medicalHistory.smokingStatus = smokingStatus || medicalHistory.smokingStatus;
      medicalHistory.alcoholConsumption = alcoholConsumption || medicalHistory.alcoholConsumption;
      medicalHistory.exerciseFrequency = exerciseFrequency || medicalHistory.exerciseFrequency;
      medicalHistory.familyHistory = familyHistory || medicalHistory.familyHistory;
      medicalHistory.healthRecords = healthRecords || medicalHistory.healthRecords;

      await medicalHistory.save();
      console.log('[Medical History] -Updated:', medicalHistory._id);
    } else {
      // Create new
      medicalHistory = new MedicalHistory({
        userId: req.user.id,
        height,
        weight,
        bloodPressure,
        bloodGroup,
        chronicDiseases,
        surgeries,
        injuries,
        medicineAllergies,
        foodAllergies,
        otherAllergies,
        currentMedications,
        smokingStatus,
        alcoholConsumption,
        exerciseFrequency,
        familyHistory,
        healthRecords
      });

      await medicalHistory.save();
      console.log('[Medical History] - Created:', medicalHistory._id);
    }

    res.json({
      success: true,
      message: 'Medical history saved successfully',
      data: medicalHistory
    });
  } catch (error) {
    console.error('[Error] Save Medical History:', error.message);
    res.status(500).json({ success: false, message: 'Failed to save medical history: ' + error.message });
  }
});

// GET OWN MEDICAL HISTORY (Patient)
router.get('/me', protect, async (req, res) => {
  try {
    console.log('[Medical History] Fetching for user:', req.user.id);

    const medicalHistory = await MedicalHistory.findOne({ userId: req.user.id });

    if (!medicalHistory) {
      return res.json({ success: true, data: null, message: 'No medical history found' });
    }

    res.json({ success: true, data: medicalHistory });
  } catch (error) {
    console.error('[Error] Get Medical History:', error.message);
    res.status(500).json({ success: false, message: 'Failed to fetch medical history: ' + error.message });
  }
});

//  GET PATIENT MEDICAL HISTORY (Doctor - by patient ID)
router.get('/patient/:patientUserId', protect, async (req, res) => {
  try {
    const { patientUserId } = req.params;

    console.log('[Medical History] Doctor requesting patient history:', patientUserId);
    console.log('[Medical History] Doctor ID:', req.user.id);

    // Verify doctor role
    if (req.user.role !== 'doctor') {
      return res.status(403).json({ success: false, message: 'Only doctors can view patient history' });
    }

    // Get patient medical history
    const medicalHistory = await MedicalHistory.findOne({ userId: patientUserId }).populate('userId', 'firstName lastName email');

    if (!medicalHistory) {
      return res.json({ success: true, data: null, message: 'No medical history found for this patient' });
    }

    console.log('[Medical History]- Retrieved for patient:', patientUserId);

    res.json({ success: true, data: medicalHistory });
  } catch (error) {
    console.error('[Error] Get Patient Medical History:', error.message);
    res.status(500).json({ success: false, message: 'Failed to fetch patient medical history: ' + error.message });
  }
});

module.exports = router;