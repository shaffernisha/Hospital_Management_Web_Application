import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { appointmentAPI, doctorAPI } from '../api';
import PatientPrescriptions from '../components/PatientPrescriptions';

const PatientDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [prescriptions, setPrescriptions] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showBooking, setShowBooking] = useState(false);
  const [showMedicalHistory, setShowMedicalHistory] = useState(false);
  const [medicalHistoryStep, setMedicalHistoryStep] = useState(1);
  const [bookingForm, setBookingForm] = useState({
    doctorId: '',
    appointmentDate: '',
    appointmentTime: '',
    reason: '',
  });

  const [medicalHistory, setMedicalHistory] = useState({
    height: '',
    weight: '',
    bloodPressure: '',
    chronicDiseases: '',
    surgeries: '',
    injuries: '',
    medicineAllergies: '',
    foodAllergies: '',
    otherAllergies: '',
    currentMedications: '',
    smokingStatus: '',
    alcoholConsumption: '',
    exerciseFrequency: '',
    familyHistory: '',
    healthRecords: null,
  });

  const dashboardStyles = `
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    .patient-dashboard {
      min-height: 100vh;
      background: linear-gradient(135deg, #f0f4f8 0%, #d9e2ec 100%);
      padding: 2rem;
    }

    .dashboard-container {
      max-width: 1400px;
      margin: 0 auto;
    }

    .dashboard-header {
      background: white;
      padding: 2rem;
      border-radius: 16px;
      margin-bottom: 2rem;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 2rem;
    }

    .header-left {
      flex: 1;
    }

    .header-greeting {
      display: flex;
      align-items: center;
      gap: 1.5rem;
    }

    .header-greeting h1 {
      font-size: 2rem;
      color: #1a6b63;
      margin-bottom: 0.5rem;
      font-weight: 700;
    }

    .header-greeting p {
      color: #666;
      font-size: 1rem;
      margin-bottom: 0.5rem;
    }

    .care-seeker-badge {
      display: inline-block;
      background: linear-gradient(135deg, #FF7A45 0%, #FF6B35 100%);
      color: white;
      padding: 0.5rem 1.2rem;
      border-radius: 20px;
      font-size: 0.85rem;
      font-weight: 600;
      margin-top: 0.5rem;
    }

    .header-actions {
      display: flex;
      gap: 0.75rem;
      flex-shrink: 0;
    }

    .btn {
      padding: 0.3rem 0.6rem;
      border: none;
      border-radius: 8px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s;
      display: flex;
      align-items: center;
      gap: 0.4rem;
      font-size: 0.7rem;
    }

    .btn-primary {
      background: linear-gradient(135deg, #FF7A45 0%, #FF6B35 100%);
      color: white;
      box-shadow: 0 4px 12px rgba(255, 122, 69, 0.3);
    }

    .btn-primary:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 20px rgba(255, 122, 69, 0.4);
    }

    .btn-outline {
      background: white;
      color: #1a6b63;
      border: 2px solid #1a6b63;
    }

    .btn-outline:hover {
      background: #1a6b63;
      color: white;
    }
.btn svg {
  width: 24px;
  height: 24px;
}
    .dashboard-tabs {
      display: flex;
      gap: 0.5rem;
      margin-bottom: 2rem;
      background: white;
      padding: 1rem;
      border-radius: 12px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    }

    .tab-btn {
      padding: 0.75rem 1.5rem;
      border: none;
      background: transparent;
      color: #666;
      font-weight: 600;
      cursor: pointer;
      border-bottom: 3px solid transparent;
      transition: all 0.3s;
      font-size: 0.95rem;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .tab-btn.active {
      color: #1a6b63;
      border-bottom-color: #FF7A45;
    }

    .tab-btn:hover {
      color: #1a6b63;
    }

    .dashboard-content {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 1.5rem;
    }

    .stat-card {
      background: white;
      padding: 1.5rem;
      border-radius: 12px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
      text-align: center;
      transition: all 0.3s;
      border-top: 4px solid #FF7A45;
    }

    .stat-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
    }

    .stat-icon {
      width: 48px;
      height: 48px;
      background: linear-gradient(135deg, #FF7A45 0%, #FF6B35 100%);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 1rem;
    }

    .stat-icon svg {
      width: 24px;
      height: 24px;
      color: white;
      stroke: white;
      fill: none;
      stroke-width: 2;
    }

    .stat-number {
      font-size: 2.5rem;
      font-weight: 800;
      color: #1a6b63;
      margin-bottom: 0.5rem;
    }

    .stat-label {
      color: #666;
      font-weight: 600;
      font-size: 0.95rem;
    }

    .medical-history-card {
      background: linear-gradient(135deg, #1a6b63 0%, #158170 100%);
      color: white;
      padding: 1.5rem;
      border-radius: 12px;
      text-align: center;
      transition: all 0.3s;
      cursor: pointer;
      border: none;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    }

    .medical-history-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
    }

    .medical-history-icon {
      width: 56px;
      height: 56px;
      background: rgba(255, 255, 255, 0.2);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 1rem;
    }

    .medical-history-icon svg {
      width: 28px;
      height: 28px;
      color: white;
      stroke: white;
      fill: none;
      stroke-width: 2;
    }

    .medical-history-card h3 {
      font-size: 1.3rem;
      margin-bottom: 0.5rem;
      font-weight: 700;
      color: #ffffff; 
    }

    .medical-history-card p {
      color: rgba(255, 255, 255, 0.9);
      font-size: 0.95rem;
      line-height: 1.5;
    }

    .section {
      grid-column: 1 / -1;
      background: white;
      padding: 2rem;
      border-radius: 12px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    }

    .section-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1.5rem;
    }

    .section-title {
      font-size: 1.5rem;
      color: #1a6b63;
      font-weight: 700;
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }

    .section-title svg {
      width: 24px;
      height: 24px;
      stroke: #1a6b63;
      stroke-width: 2;
    }

    .appointments-list {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 1.5rem;
    }

    .appointment-card {
      background: linear-gradient(135deg, #f5f7fa 0%, #e9ecef 100%);
      padding: 1.5rem;
      border-radius: 12px;
      border-left: 5px solid #FF7A45;
      transition: all 0.3s;
    }

    .appointment-card:hover {
      transform: translateX(5px);
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
    }

    .appointment-date {
      color: #FF7A45;
      font-weight: 700;
      margin-bottom: 1rem;
      font-size: 1.05rem;
    }

    .appointment-details {
      color: #666;
      font-size: 0.9rem;
      line-height: 1.8;
      margin-bottom: 1rem;
    }

    .appointment-details p {
      margin-bottom: 0.5rem;
    }

    .appointment-status {
      display: inline-block;
      padding: 0.5rem 1rem;
      border-radius: 20px;
      font-size: 0.8rem;
      font-weight: 600;
      margin-top: 1rem;
    }

    .status-pending {
      background: #fff3cd;
      color: #856404;
    }

    .status-confirmed {
      background: #d4edda;
      color: #155724;
    }

    .status-completed {
      background: #d1ecf1;
      color: #0c5460;
    }

    .doctors-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
      gap: 1.5rem;
    }

    .doctor-card {
      background: linear-gradient(135deg, #e9ecef 0%, #f5f7fa 100%);
      padding: 1.5rem;
      border-radius: 12px;
      text-align: center;
      border-top: 3px solid #1a6b63;
      transition: all 0.3s;
    }

    .doctor-card:hover {
      transform: translateY(-8px);
      box-shadow: 0 12px 30px rgba(0, 0, 0, 0.15);
    }

    .doctor-avatar {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      background: linear-gradient(135deg, #FF7A45 0%, #FF6B35 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 1rem;
    }

    .doctor-avatar svg {
      width: 40px;
      height: 40px;
      color: white;
      stroke: white;
      fill: none;
      stroke-width: 2;
    }

    .doctor-name {
      font-size: 1.1rem;
      color: #1a6b63;
      font-weight: 700;
      margin-bottom: 0.5rem;
    }

    .doctor-specialty {
      color: #FF7A45;
      font-weight: 600;
      margin-bottom: 0.5rem;
      font-size: 0.9rem;
    }

    .doctor-experience {
      color: #666;
      font-size: 0.9rem;
      margin-bottom: 1rem;
    }

    .doctor-fee {
      color: #1a6b63;
      font-weight: 700;
      font-size: 1.1rem;
      margin-bottom: 1rem;
    }

    .empty-state {
      text-align: center;
      padding: 3rem 2rem;
      color: #666;
    }

    .empty-icon {
      width: 80px;
      height: 80px;
      margin: 0 auto 1rem;
      opacity: 0.3;
    }

    .empty-icon svg {
      width: 100%;
      height: 100%;
      stroke: #666;
      fill: none;
      stroke-width: 1.5;
    }

    .empty-state p {
      font-size: 1.05rem;
      margin-bottom: 1.5rem;
    }

    .booking-modal {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.7);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
      overflow-y: auto;
      padding: 2rem;
    }

    .booking-form {
      background: white;
      padding: 2.5rem;
      border-radius: 16px;
      max-width: 600px;
      width: 100%;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
    }

    .booking-form h2 {
      color: #1a6b63;
      margin-bottom: 1.5rem;
      font-weight: 700;
    }

    .form-group {
      margin-bottom: 1.5rem;
    }

    .form-group label {
      display: block;
      color: #333;
      font-weight: 600;
      margin-bottom: 0.5rem;
      font-size: 0.9rem;
    }

    .form-group input,
    .form-group select,
    .form-group textarea {
      width: 100%;
      padding: 0.75rem;
      border: 2px solid #e9ecef;
      border-radius: 8px;
      font-size: 1rem;
      font-family: inherit;
      transition: all 0.3s;
    }

    .form-group input:focus,
    .form-group select:focus,
    .form-group textarea:focus {
      outline: none;
      border-color: #FF7A45;
      box-shadow: 0 0 0 3px rgba(255, 122, 69, 0.1);
    }

    .form-actions {
      display: flex;
      gap: 1rem;
      margin-top: 2rem;
    }

    .form-actions button {
      flex: 1;
      padding: 0.75rem;
      border: none;
      border-radius: 8px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s;
    }

    .step-indicator {
      display: flex;
      gap: 0.5rem;
      margin-bottom: 2rem;
      justify-content: space-between;
    }

    .step {
      flex: 1;
      height: 4px;
      background: #e9ecef;
      border-radius: 2px;
      overflow: hidden;
    }

    .step.active {
      background: #FF7A45;
    }

    .step-info {
      color: #666;
      font-size: 0.85rem;
      text-align: center;
      margin-bottom: 1rem;
    }

    .form-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
    }

    .file-upload {
      border: 2px dashed #FF7A45;
      border-radius: 8px;
      padding: 2rem;
      text-align: center;
      cursor: pointer;
      transition: all 0.3s;
      background: #f5f7fa;
    }

    .file-upload:hover {
      background: rgba(255, 122, 69, 0.1);
    }

    .file-upload input {
      display: none;
    }

    .profile-info {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 1.5rem;
    }

    .info-item {
      background: #f5f7fa;
      padding: 1.5rem;
      border-radius: 12px;
      border-left: 4px solid #1a6b63;
    }

    .info-label {
      font-weight: 600;
      color: #1a6b63;
      margin-bottom: 0.5rem;
      font-size: 0.9rem;
    }

    .info-value {
      color: #666;
      font-size: 1rem;
    }

    .loading {
      text-align: center;
      padding: 3rem;
      color: #666;
    }

    .loading-spinner {
      width: 40px;
      height: 40px;
      border: 4px solid #e9ecef;
      border-top-color: #FF7A45;
      border-radius: 50%;
      animation: spin 0.8s linear infinite;
      margin: 0 auto 1rem;
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }

    @media (max-width: 768px) {
      .dashboard-header {
        flex-direction: column;
        text-align: center;
      }

      .header-greeting {
        flex-direction: column;
        gap: 0.5rem;
      }

      .dashboard-tabs {
        flex-wrap: wrap;
      }

      .dashboard-content {
        grid-template-columns: 1fr;
      }

      .header-greeting h1 {
        font-size: 1.5rem;
      }

      .section-header {
        flex-direction: column;
        align-items: flex-start;
        gap: 1rem;
      }

      .form-row {
        grid-template-columns: 1fr;
      }
    }
  `;

  // ✅ LOAD DATA ONLY ON MOUNT - NO AUTO REFRESH
  useEffect(() => {
    const token = localStorage.getItem('token');
    const userInfo = localStorage.getItem('user');

    if (!token || !userInfo) {
      navigate('/login');
      return;
    }

    const userData = JSON.parse(userInfo);
    if (userData.role !== 'patient') {
      navigate('/');
      return;
    }

    setUser(userData);
    loadData();
  }, [navigate]);

  //  loadData WITH PRESCRIPTIONS
  const loadData = async () => {
    try {
      setLoading(true);

      console.log('[DEBUG] Starting loadData...');

      const token = localStorage.getItem('token');

      // Fetch appointments
      try {
        console.log('[DEBUG] Fetching appointments from /api/appointments');
        const appointmentsRes = await appointmentAPI.getAll();
        console.log('[DEBUG] Appointments Response:', appointmentsRes);
        
        if (appointmentsRes && appointmentsRes.success && appointmentsRes.data) {
          console.log('[DEBUG] Setting appointments:', appointmentsRes.data.length);
          setAppointments(appointmentsRes.data);
        } else if (appointmentsRes && appointmentsRes.data) {
          console.log('[DEBUG] Setting appointments (no success flag):', appointmentsRes.data.length);
          setAppointments(appointmentsRes.data);
        }
      } catch (error) {
        console.error('[ERROR] Error fetching appointments:', error);
        setAppointments([]);
      }

      // Fetch doctors
      try {
        console.log('[DEBUG] Fetching doctors...');
        const doctorsRes = await doctorAPI.getAll();
        console.log('[DEBUG] Doctors Response:', doctorsRes);
        
        if (doctorsRes && doctorsRes.success && doctorsRes.data && Array.isArray(doctorsRes.data)) {
          console.log('[DEBUG] Setting doctors:', doctorsRes.data.length);
          setDoctors(doctorsRes.data);
        } else if (doctorsRes && doctorsRes.data && Array.isArray(doctorsRes.data)) {
          console.log('[DEBUG] Setting doctors (no success flag):', doctorsRes.data.length);
          setDoctors(doctorsRes.data);
        } else {
          console.log('[DEBUG] No doctors data');
          setDoctors([]);
        }
      } catch (error) {
        console.error('[ERROR] Error fetching doctors:', error);
        setDoctors([]);
      }

      //  FETCH PRESCRIPTIONS
      try {
        console.log('[DEBUG] Fetching prescriptions from /api/prescriptions/patient');
        const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
        
        const prescriptionsRes = await fetch(`${API_URL}/prescriptions/patient`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });

        const prescriptionsData = await prescriptionsRes.json();
        console.log('[DEBUG] Prescriptions Response:', prescriptionsData);
        
        if (prescriptionsData && prescriptionsData.success && Array.isArray(prescriptionsData.data)) {
          console.log('[DEBUG] Setting prescriptions:', prescriptionsData.data.length);
          setPrescriptions(prescriptionsData.data);
        } else if (prescriptionsData && Array.isArray(prescriptionsData.data)) {
          console.log('[DEBUG] Setting prescriptions (no success flag):', prescriptionsData.data.length);
          setPrescriptions(prescriptionsData.data);
        } else {
          console.log('[DEBUG] No prescriptions data');
          setPrescriptions([]);
        }
      } catch (error) {
        console.error('[ERROR] Error fetching prescriptions:', error);
        setPrescriptions([]);
      }

    } finally {
      setLoading(false);
      console.log('[DEBUG] loadData complete');
    }
  };

  //BOOKING HANDLER 
  const handleBookAppointment = async () => {
    try {
      if (!bookingForm.doctorId || !bookingForm.appointmentDate || !bookingForm.appointmentTime || !bookingForm.reason) {
        alert('Please fill all fields');
        return;
      }

      const selectedDoctor = doctors.find(d => d._id === bookingForm.doctorId);
      
      console.log('[BOOKING] Creating appointment...');
      const response = await appointmentAPI.create({
        ...bookingForm,
        consultationFee: selectedDoctor.consultationFee,
      });

      console.log('[BOOKING] Response:', response);

      if (response && response.success) {
        alert('Appointment booked successfully!');
        setShowBooking(false);
        setBookingForm({
          doctorId: '',
          appointmentDate: '',
          appointmentTime: '',
          reason: '',
        });
        console.log('[BOOKING] Refreshing data...');
        await new Promise(resolve => setTimeout(resolve, 2000));
        loadData();
      } else {
        alert('Appointment created but refresh failed');
        loadData();
      }
      
    } catch (error) {
      console.error('[BOOKING ERROR]:', error);
      alert('Error booking appointment: ' + (error.response?.data?.message || error.message));
    }
  };
  const handleMedicalHistorySubmit = async () => {
  try {
    console.log('[Medical History] Saving medical history...');

    const token = localStorage.getItem('token');
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

    const payload = {
      height: medicalHistory.height,
      weight: medicalHistory.weight,
      bloodPressure: medicalHistory.bloodPressure,
      bloodGroup: medicalHistory.bloodGroup,
      chronicDiseases: medicalHistory.chronicDiseases,
      surgeries: medicalHistory.surgeries,
      injuries: medicalHistory.injuries,
      medicineAllergies: medicalHistory.medicineAllergies,
      foodAllergies: medicalHistory.foodAllergies,
      otherAllergies: medicalHistory.otherAllergies,
      currentMedications: medicalHistory.currentMedications,
      smokingStatus: medicalHistory.smokingStatus,
      alcoholConsumption: medicalHistory.alcoholConsumption,
      exerciseFrequency: medicalHistory.exerciseFrequency,
      familyHistory: medicalHistory.familyHistory,
      healthRecords: medicalHistory.healthRecords
    };

    console.log('[Medical History] Payload:', payload);

    const response = await fetch(`${API_URL}/medical-history/save`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(payload)
    });

    const data = await response.json();
    console.log('[Medical History] Response:', data);

    if (data.success) {
      console.log('[Medical History]  Saved successfully');
      alert('Medical history saved successfully!');
      setShowMedicalHistory(false);
      setMedicalHistoryStep(1);
      setMedicalHistory({
        height: '',
        weight: '',
        bloodPressure: '',
        bloodGroup: '',
        chronicDiseases: '',
        surgeries: '',
        injuries: '',
        medicineAllergies: '',
        foodAllergies: '',
        otherAllergies: '',
        currentMedications: '',
        smokingStatus: '',
        alcoholConsumption: '',
        exerciseFrequency: '',
        familyHistory: '',
        healthRecords: null,
      });
    } else {
      alert('Error saving medical history: ' + (data.message || 'Unknown error'));
    }
  } catch (error) {
    console.error('[Medical History Error]:', error);
    alert('Error saving medical history: ' + error.message);
  }
};

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  if (loading) {
    return (
      <>
        <style>{dashboardStyles}</style>
        <div className="patient-dashboard">
          <div className="dashboard-container">
            <div className="loading">
              <div className="loading-spinner"></div>
              <p>Loading your dashboard...</p>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <style>{dashboardStyles}</style>
      <div className="patient-dashboard">
        <div className="dashboard-container">
          {/* Header */}
          <div className="dashboard-header">
            <div className="header-left">
              <div className="header-greeting">
                <div>
                  <h1>Welcome, {user?.firstName}!</h1>
                  <p>Manage your health appointments and medical consultations</p>
                  <div className="care-seeker-badge">Care Seeker</div>
                </div>
              </div>
            </div>
            <div className="header-actions">
              <button className="btn btn-primary" onClick={() => setShowBooking(true)}>
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2"/>
                  <path d="M16 2v4M8 2v4M3 10h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                Book Appointment
              </button>
      <button className="btn btn-primary" onClick={() => setShowMedicalHistory(true)}>
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" 
          stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <polyline points="14 2 14 8 20 8" 
              stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <line x1="12" y1="11" x2="12" y2="17" 
          stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <line x1="9" y1="14" x2="15" y2="14" 
          stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
  Medical History
</button>
              <button className="btn btn-outline" onClick={handleLogout}>
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 17H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M17 16l4-4m0 0l-4-4m4 4H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Logout
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="dashboard-tabs">
            <button
              className={`tab-btn ${activeTab === 'dashboard' ? 'active' : ''}`}
              onClick={() => setActiveTab('dashboard')}
            >
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="3" y="3" width="7" height="7" stroke="currentColor" strokeWidth="2"/>
                <rect x="14" y="3" width="7" height="7" stroke="currentColor" strokeWidth="2"/>
                <rect x="3" y="14" width="7" height="7" stroke="currentColor" strokeWidth="2"/>
                <rect x="14" y="14" width="7" height="7" stroke="currentColor" strokeWidth="2"/>
              </svg>
              Dashboard
            </button>
            <button
              className={`tab-btn ${activeTab === 'appointments' ? 'active' : ''}`}
              onClick={() => setActiveTab('appointments')}
            >
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2"/>
                <path d="M16 2v4M8 2v4M3 10h18" stroke="currentColor" strokeWidth="2"/>
              </svg>
              Appointments
            </button>
            <button
              className={`tab-btn ${activeTab === 'doctors' ? 'active' : ''}`}
              onClick={() => setActiveTab('doctors')}
            >
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" stroke="currentColor" strokeWidth="2"/>
              </svg>
              Doctors
            </button>
            <button
              className={`tab-btn ${activeTab === 'profile' ? 'active' : ''}`}
              onClick={() => setActiveTab('profile')}
            >
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" stroke="currentColor" strokeWidth="2"/>
              </svg>
              Profile
            </button>
            <button
              className={`tab-btn ${activeTab === 'prescriptions' ? 'active' : ''}`}
              onClick={() => setActiveTab('prescriptions')}
            >

              My Prescriptions
            </button>
          </div>

          {/* Dashboard Tab */}
          {activeTab === 'dashboard' && (
            <div className="dashboard-content">
              <div className="stat-card">
                <div className="stat-icon">
                  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <rect x="3" y="4" width="18" height="18" rx="2"/>
                    <path d="M16 2v4M8 2v4M3 10h18" strokeLinecap="round"/>
                  </svg>
                </div>
                <div className="stat-number">{appointments.length}</div>
                <div className="stat-label">Total Appointments</div>
              </div>

              <div className="stat-card">
                <div className="stat-icon">
                  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>
                <div className="stat-number">{appointments.filter(a => a.status === 'confirmed').length}</div>
                <div className="stat-label">Confirmed</div>
              </div>

              <div className="stat-card">
                <div className="stat-icon">
                  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"/>
                  </svg>
                </div>
                <div className="stat-number">{doctors.length}</div>
                <div className="stat-label">Available Doctors</div>
              </div>

              {/* Medical History Card */}
              <button 
                className="medical-history-card"
                onClick={() => setShowMedicalHistory(true)}
              >
                <div className="medical-history-icon">
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <polyline points="13 2 13 9 20 9" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <line x1="9" y1="15" x2="15" y2="15" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                    <line x1="9" y1="11" x2="15" y2="11" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </div>
                <h3>Medical History</h3>
                <p>Add and manage your complete medical history and health records</p>
              </button>

              <div className="section">
                <div className="section-header">
                  <h2 className="section-title">
                    <svg viewBox="0 0 24 24" fill="none">
                      <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2"/>
                      <path d="M16 2v4M8 2v4M3 10h18" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                    Upcoming Appointments
                  </h2>
                </div>

                {appointments.filter(a => a.status !== 'completed').length > 0 ? (
                  <div className="appointments-list">
                    {appointments.filter(a => a.status !== 'completed').map(apt => (
                      <div key={apt._id} className="appointment-card">
                        <div className="appointment-date">
                          {new Date(apt.appointmentDate).toLocaleDateString()} at {apt.appointmentTime}
                        </div>
                        <div className="appointment-details">
                          <p><strong>Doctor:</strong> Dr. {apt.doctorId?.userId?.firstName} {apt.doctorId?.userId?.lastName}</p>
                          <p><strong>Specialty:</strong> {apt.doctorId?.specialization}</p>
                          <p><strong>Reason:</strong> {apt.reason}</p>
                          <p><strong>Fee:</strong> Rs{apt.consultationFee}</p>
                        </div>
                        <span className={`appointment-status status-${apt.status}`}>
                          {apt.status.charAt(0).toUpperCase() + apt.status.slice(1)}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="empty-state">
                    <div className="empty-icon">
                      <svg viewBox="0 0 24 24" fill="none">
                        <rect x="3" y="4" width="18" height="18" rx="2"/>
                        <path d="M16 2v4M8 2v4M3 10h18"/>
                      </svg>
                    </div>
                    <p>No upcoming appointments</p>
                    <button className="btn btn-primary" onClick={() => setShowBooking(true)}>
                      <svg viewBox="0 0 24 24" fill="none">
                        <line x1="12" y1="5" x2="12" y2="19" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                        <line x1="5" y1="12" x2="19" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                      </svg>
                      Book Your First Appointment
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Appointments Tab */}
          {activeTab === 'appointments' && (
            <div className="section">
              <h2 className="section-title">
                <svg viewBox="0 0 24 24" fill="none">
                  <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2"/>
                  <path d="M16 2v4M8 2v4M3 10h18" stroke="currentColor" strokeWidth="2"/>
                </svg>
                All Appointments
              </h2>
              {appointments.length > 0 ? (
                <div className="appointments-list">
                  {appointments.map(apt => (
                    <div key={apt._id} className="appointment-card">
                      <div className="appointment-date">
                        {new Date(apt.appointmentDate).toLocaleDateString()} at {apt.appointmentTime}
                      </div>
                      <div className="appointment-details">
                        <p><strong>Doctor:</strong> Dr. {apt.doctorId?.userId?.firstName} {apt.doctorId?.userId?.lastName}</p>
                        <p><strong>Specialty:</strong> {apt.doctorId?.specialization}</p>
                        <p><strong>Reason:</strong> {apt.reason}</p>
                        <p><strong>Fee:</strong> Rs{apt.consultationFee}</p>
                      </div>
                      <span className={`appointment-status status-${apt.status}`}>
                        {apt.status.charAt(0).toUpperCase() + apt.status.slice(1)}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="empty-state">
                  <div className="empty-icon">
                    <svg viewBox="0 0 24 24" fill="none">
                      <rect x="3" y="4" width="18" height="18" rx="2"/>
                      <path d="M16 2v4M8 2v4M3 10h18"/>
                    </svg>
                  </div>
                  <p>No appointments yet</p>
                </div>
              )}
            </div>
          )}

          {/* Doctors Tab */}
          {activeTab === 'doctors' && (
            <div className="section">
              <h2 className="section-title">
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" stroke="currentColor" strokeWidth="2"/>
                </svg>
                Find & Book Doctors
              </h2>
              {doctors.length > 0 ? (
                <div className="doctors-grid">
                  {doctors.map(doctor => (
                    <div key={doctor._id} className="doctor-card">
                      <div className="doctor-avatar">
                        <svg viewBox="0 0 24 24">
                          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"/>
                        </svg>
                      </div>
                      <div className="doctor-name">Dr. {doctor.userId?.firstName} {doctor.userId?.lastName}</div>
                      <div className="doctor-specialty">{doctor.specialization}</div>
                      <div className="doctor-experience">{doctor.yearsOfExperience}+ years experience</div>
                      <div className="doctor-fee">Rs{doctor.consultationFee}</div>
                      <button 
                        className="btn btn-primary" 
                        onClick={() => {
                          setBookingForm({ ...bookingForm, doctorId: doctor._id });
                          setShowBooking(true);
                        }}
                      >
                        <svg viewBox="0 0 24 24" fill="none">
                          <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2"/>
                          <path d="M16 2v4M8 2v4M3 10h18" stroke="currentColor" strokeWidth="2"/>
                        </svg>
                        Book
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="empty-state">
                  <div className="empty-icon">
                    <svg viewBox="0 0 24 24" fill="none">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"/>
                    </svg>
                  </div>
                  <p>No doctors available</p>
                </div>
              )}
            </div>
          )}

          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <div className="section">
              <h2 className="section-title">
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" stroke="currentColor" strokeWidth="2"/>
                </svg>
                My Profile
              </h2>
              <div className="profile-info">
                <div className="info-item">
                  <div className="info-label">Full Name</div>
                  <div className="info-value">{user?.firstName} {user?.lastName}</div>
                </div>
                <div className="info-item">
                  <div className="info-label">Email Address</div>
                  <div className="info-value">{user?.email}</div>
                </div>
                <div className="info-item">
                  <div className="info-label">Phone Number</div>
                  <div className="info-value">{user?.phone}</div>
                </div>
                <div className="info-item">
                  <div className="info-label">Member Type</div>
                  <div className="info-value">Care Seeker</div>
                </div>
              </div>
            </div>
          )}

          {/* Prescriptions Tab - ✅ UPDATED WITH PRESCRIPTIONS PROP */}
          {activeTab === 'prescriptions' && (
            <PatientPrescriptions prescriptions={prescriptions} />
          )}
        </div>

        {/* Booking Modal */}
        {showBooking && (
          <div className="booking-modal" onClick={() => setShowBooking(false)}>
            <div className="booking-form" onClick={(e) => e.stopPropagation()}>
              <h2>Book an Appointment</h2>
              <form onSubmit={(e) => { e.preventDefault(); handleBookAppointment(); }}>
                <div className="form-group">
                  <label>Select Doctor *</label>
                  <select 
                    value={bookingForm.doctorId} 
                    onChange={(e) => setBookingForm({ ...bookingForm, doctorId: e.target.value })}
                    required
                  >
                    <option value="">Choose a doctor</option>
                    {doctors.map(doc => (
                      <option key={doc._id} value={doc._id}>
                        Dr. {doc.userId?.firstName} {doc.userId?.lastName} - {doc.specialization} (Rs{doc.consultationFee})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label>Appointment Date *</label>
                  <input 
                    type="date" 
                    value={bookingForm.appointmentDate}
                    onChange={(e) => setBookingForm({ ...bookingForm, appointmentDate: e.target.value })}
                    required
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>

                <div className="form-group">
                  <label>Appointment Time *</label>
                  <input 
                    type="time" 
                    value={bookingForm.appointmentTime}
                    onChange={(e) => setBookingForm({ ...bookingForm, appointmentTime: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Reason for Visit *</label>
                  <textarea 
                    value={bookingForm.reason}
                    onChange={(e) => setBookingForm({ ...bookingForm, reason: e.target.value })}
                    placeholder="Describe your symptoms or reason..."
                    rows="4"
                    required
                  />
                </div>

                <div className="form-actions">
                  <button type="button" className="btn btn-outline" onClick={() => setShowBooking(false)}>
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Book Appointment
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Medical History Modal */}
        {showMedicalHistory && (
          <div className="booking-modal" onClick={() => setShowMedicalHistory(false)}>
            <div className="booking-form" onClick={(e) => e.stopPropagation()}>
              <h2>Medical History</h2>
              <div className="step-indicator">
                {[1, 2, 3, 4, 5].map(step => (
                  <div key={step} className={`step ${step <= medicalHistoryStep ? 'active' : ''}`}></div>
                ))}
              </div>
              <div className="step-info">Step {medicalHistoryStep} of 5</div>

              <form onSubmit={(e) => { e.preventDefault(); handleMedicalHistorySubmit(); }}>
                {medicalHistoryStep === 1 && (
                  <div>
                    <h3 style={{ marginBottom: '1.5rem', color: '#1a6b63', fontWeight: '600' }}>Physical Information</h3>
                    <div className="form-row">
                      <div className="form-group">
                        <label>Height (cm) *</label>
                        <input type="number" placeholder="170" value={medicalHistory.height} onChange={(e) => setMedicalHistory({ ...medicalHistory, height: e.target.value })} required/>
                      </div>
                      <div className="form-group">
                        <label>Weight (kg) *</label>
                        <input type="number" placeholder="70" value={medicalHistory.weight} onChange={(e) => setMedicalHistory({ ...medicalHistory, weight: e.target.value })} required/>
                      </div>
                    </div>
                    <div className="form-group">
                      <label>Blood Pressure (e.g., 120/80) *</label>
                      <input type="text" placeholder="120/80" value={medicalHistory.bloodPressure} onChange={(e) => setMedicalHistory({ ...medicalHistory, bloodPressure: e.target.value })} required/>
                    </div>
                  </div>
                )}

                {medicalHistoryStep === 2 && (
                  <div>
                    <h3 style={{ marginBottom: '1.5rem', color: '#1a6b63', fontWeight: '600' }}>Medical Conditions</h3>
                    <div className="form-group">
                      <label>Chronic Diseases (if any)</label>
                      <textarea placeholder="e.g., Diabetes, Hypertension, Asthma..." value={medicalHistory.chronicDiseases} onChange={(e) => setMedicalHistory({ ...medicalHistory, chronicDiseases: e.target.value })} rows="3"/>
                    </div>
                    <div className="form-group">
                      <label>Previous Surgeries</label>
                      <textarea placeholder="List any surgeries with dates..." value={medicalHistory.surgeries} onChange={(e) => setMedicalHistory({ ...medicalHistory, surgeries: e.target.value })} rows="3"/>
                    </div>
                    <div className="form-group">
                      <label>Past Injuries or Accidents</label>
                      <textarea placeholder="Describe any major injuries..." value={medicalHistory.injuries} onChange={(e) => setMedicalHistory({ ...medicalHistory, injuries: e.target.value })} rows="3"/>
                    </div>
                  </div>
                )}

                {medicalHistoryStep === 3 && (
                  <div>
                    <h3 style={{ marginBottom: '1.5rem', color: '#1a6b63', fontWeight: '600' }}>Allergies & Medications</h3>
                    <div className="form-group">
                      <label>Allergic to any Medicine? *</label>
                      <textarea placeholder="List medicines you're allergic to..." value={medicalHistory.medicineAllergies} onChange={(e) => setMedicalHistory({ ...medicalHistory, medicineAllergies: e.target.value })} rows="3" required/>
                    </div>
                    <div className="form-group">
                      <label>Food Allergies</label>
                      <textarea placeholder="e.g., Peanuts, Shellfish..." value={medicalHistory.foodAllergies} onChange={(e) => setMedicalHistory({ ...medicalHistory, foodAllergies: e.target.value })} rows="3"/>
                    </div>
                    <div className="form-group">
                      <label>Other Allergies</label>
                      <textarea placeholder="e.g., Latex, Pollen..." value={medicalHistory.otherAllergies} onChange={(e) => setMedicalHistory({ ...medicalHistory, otherAllergies: e.target.value })} rows="3"/>
                    </div>
                    <div className="form-group">
                      <label>Current Medications</label>
                      <textarea placeholder="List all medications with dosage..." value={medicalHistory.currentMedications} onChange={(e) => setMedicalHistory({ ...medicalHistory, currentMedications: e.target.value })} rows="3"/>
                    </div>
                  </div>
                )}

                {medicalHistoryStep === 4 && (
                  <div>
                    <h3 style={{ marginBottom: '1.5rem', color: '#1a6b63', fontWeight: '600' }}>Lifestyle & Family History</h3>
                    <div className="form-group">
                      <label>Smoking Status *</label>
                      <select value={medicalHistory.smokingStatus} onChange={(e) => setMedicalHistory({ ...medicalHistory, smokingStatus: e.target.value })} required>
                        <option value="">Select...</option>
                        <option value="never">Never smoked</option>
                        <option value="former">Former smoker</option>
                        <option value="current">Current smoker</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Alcohol Consumption *</label>
                      <select value={medicalHistory.alcoholConsumption} onChange={(e) => setMedicalHistory({ ...medicalHistory, alcoholConsumption: e.target.value })} required>
                        <option value="">Select...</option>
                        <option value="none">None</option>
                        <option value="moderate">Moderate</option>
                        <option value="heavy">Heavy</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Exercise Frequency *</label>
                      <select value={medicalHistory.exerciseFrequency} onChange={(e) => setMedicalHistory({ ...medicalHistory, exerciseFrequency: e.target.value })} required>
                        <option value="">Select...</option>
                        <option value="sedentary">Sedentary</option>
                        <option value="light">1-2 times/week</option>
                        <option value="moderate">3-4 times/week</option>
                        <option value="intense">5+ times/week</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Family History</label>
                      <textarea placeholder="Any hereditary conditions..." value={medicalHistory.familyHistory} onChange={(e) => setMedicalHistory({ ...medicalHistory, familyHistory: e.target.value })} rows="3"/>
                    </div>
                  </div>
                )}

                {medicalHistoryStep === 5 && (
                  <div>
                    <h3 style={{ marginBottom: '1.5rem', color: '#1a6b63', fontWeight: '600' }}>Health Documents</h3>
                    <div className="form-group">
                      <label>Upload Health Records</label>
                      <div className="file-upload">
                        <input type="file" id="healthRecords" onChange={(e) => setMedicalHistory({ ...medicalHistory, healthRecords: e.target.files[0] })} accept=".pdf,.jpg,.jpeg,.png"/>
                        <label htmlFor="healthRecords" style={{ cursor: 'pointer' }}>
                          <p style={{ color: '#FF7A45', fontWeight: '600' }}>Click to upload or drag and drop</p>
                          <p style={{ color: '#666', fontSize: '0.85rem' }}>PDF, JPG or PNG (Max 10MB)</p>
                          {medicalHistory.healthRecords && <p style={{ color: '#51cf66', marginTop: '0.5rem', fontWeight: '600' }}>✓ {medicalHistory.healthRecords.name}</p>}
                        </label>
                      </div>
                    </div>
                  </div>
                )}

                <div className="form-actions" style={{ marginTop: '2rem' }}>
                  <button type="button" className="btn btn-outline" onClick={() => {
                    if (medicalHistoryStep > 1) {
                      setMedicalHistoryStep(medicalHistoryStep - 1);
                    } else {
                      setShowMedicalHistory(false);
                    }
                  }}>
                    {medicalHistoryStep === 1 ? 'Cancel' : 'Back'}
                  </button>
                  {medicalHistoryStep < 5 ? (
                    <button type="button" className="btn btn-primary" onClick={() => setMedicalHistoryStep(medicalHistoryStep + 1)}>
                      Next
                    </button>
                  ) : (
                    <button type="submit" className="btn btn-primary">
                      Save Medical History
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default PatientDashboard;
