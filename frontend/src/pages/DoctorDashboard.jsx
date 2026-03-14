import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { appointmentAPI, prescriptionAPI } from '../api';

const DoctorDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [showPrescription, setShowPrescription] = useState(false);
  const [showMedicalHistory, setShowMedicalHistory] = useState(false);
  const [selectedPatientHistory, setSelectedPatientHistory] = useState(null);
  const [loadingHistory, setLoadingHistory] = useState(false);
  const [prescriptionForm, setPrescriptionForm] = useState({
    diagnosis: '',
    medicines: [{ name: '', dosage: '', frequency: '', duration: '' }],
    instructions: ''
  });

  const dashboardStyles = `
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    .doctor-dashboard {
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

    .doctor-badge {
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
      padding: 0.75rem 1.5rem;
      border: none;
      border-radius: 8px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 0.95rem;
    }

    .header-actions .btn {
      padding: 0.6rem 1.2rem;
      font-size: 0.85rem;
      gap: 0.4rem;
    }

    .header-actions .btn svg {
      width: 16px;
      height: 16px;
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

    .btn-success {
      background: linear-gradient(135deg, #1a6b63 0%, #158170 100%);
      color: white;
      box-shadow: 0 4px 12px rgba(26, 107, 99, 0.3);
    }

    .btn-success:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 20px rgba(26, 107, 99, 0.4);
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

    .section {
      grid-column: 1 / -1;
      background: white;
      padding: 2rem;
      border-radius: 12px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    }

    .section-title {
      font-size: 1.5rem;
      color: #1a6b63;
      font-weight: 700;
      display: flex;
      align-items: center;
      gap: 0.75rem;
      margin-bottom: 1.5rem;
    }

    .section-title svg {
      width: 20px;
      height: 20px;
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

    .appointment-actions {
      display: flex;
      gap: 0.75rem;
      margin-top: 1rem;
      flex-wrap: wrap;
    }

    .appointment-actions .btn {
      flex: 1;
      min-width: 120px;
      padding: 0.6rem 0.8rem;
      font-size: 0.8rem;
    }

    .appointment-actions .btn svg {
      width: 14px;
      height: 14px;
    }

    .empty-state {
      text-align: center;
      padding: 3rem 2rem;
      color: #666;
    }

    .empty-icon {
      width: 60px;
      height: 60px;
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

    .prescription-modal {
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

    .prescription-form {
      background: white;
      padding: 2.5rem;
      border-radius: 16px;
      max-width: 700px;
      width: 100%;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
    }

    .prescription-form h2 {
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

    .medicine-item {
      background: #f8f9fa;
      padding: 1rem;
      border-radius: 8px;
      margin-bottom: 1rem;
      border-left: 3px solid #FF7A45;
    }

    .medicine-item input {
      margin-bottom: 0.75rem;
    }

    .medicine-inputs-full {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 0.75rem;
    }

    .add-medicine-btn {
      background: #1a6b63;
      color: white;
      padding: 0.5rem 1rem;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      font-size: 0.85rem;
      font-weight: 600;
      transition: all 0.3s;
      margin-top: 0.5rem;
    }

    .add-medicine-btn:hover {
      background: #158170;
    }

    .remove-medicine-btn {
      background: #dc3545;
      color: white;
      padding: 0.4rem 0.8rem;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 0.75rem;
      font-weight: 600;
    }

    .remove-medicine-btn:hover {
      background: #c82333;
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

    .medical-history-modal {
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

    .medical-history-content {
      background: white;
      padding: 2rem;
      border-radius: 16px;
      max-width: 800px;
      width: 100%;
      max-height: 80vh;
      overflow-y: auto;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
    }

    .medical-history-content h2 {
      color: #1a6b63;
      margin-bottom: 1.5rem;
      font-weight: 700;
      border-bottom: 2px solid #FF7A45;
      padding-bottom: 1rem;
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }

    .medical-history-content h2 svg {
      width: 24px;
      height: 24px;
    }

    .history-section {
      margin-bottom: 1.5rem;
    }

    .history-section h3 {
      color: #FF7A45;
      font-size: 1rem;
      font-weight: 700;
      margin-bottom: 0.5rem;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .history-section p {
      color: #666;
      line-height: 1.6;
      margin-bottom: 0.5rem;
    }

    .history-value {
      background: #f5f7fa;
      padding: 0.75rem 1rem;
      border-radius: 6px;
      border-left: 3px solid #1a6b63;
      color: #333;
      font-weight: 500;
    }

    .modal-actions {
      display: flex;
      gap: 1rem;
      margin-top: 2rem;
      justify-content: flex-end;
    }

    .modal-close-btn {
      padding: 0.75rem 1.5rem;
      background: #1a6b63;
      color: white;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      font-weight: 600;
      transition: all 0.3s;
    }

    .modal-close-btn:hover {
      background: #158170;
      transform: translateY(-2px);
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

      .header-greeting h1 {
        font-size: 1.5rem;
      }

      .medicine-inputs-full {
        grid-template-columns: 1fr;
      }

      .appointment-actions {
        flex-direction: column;
      }

      .appointment-actions .btn {
        min-width: auto;
      }
    }
  `;

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userInfo = localStorage.getItem('user');

    if (!token || !userInfo) {
      navigate('/login');
      return;
    }

    const userData = JSON.parse(userInfo);
    if (userData.role !== 'doctor') {
      navigate('/');
      return;
    }

    setUser(userData);
    loadData();
  }, [navigate]);

  const loadData = async () => {
    try {
      setLoading(true);
      const appointmentsRes = await appointmentAPI.getAll();
      if (appointmentsRes && appointmentsRes.data) {
        setAppointments(appointmentsRes.data || []);
      }
    } finally {
      setLoading(false);
    }
  };

  // ✅ VIEW PATIENT MEDICAL HISTORY
  const viewPatientHistory = async (patientUserId) => {
    try {
      setLoadingHistory(true);
      console.log('[Medical History] Fetching for patient:', patientUserId);

      const token = localStorage.getItem('token');
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

      const response = await fetch(`${API_URL}/medical-history/patient/${patientUserId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();
      console.log('[Medical History] Response:', data);

      if (data.success) {
        setSelectedPatientHistory(data.data);
        setShowMedicalHistory(true);
      } else {
        alert(data.message || 'No medical history found');
      }
    } catch (error) {
      console.error('[Medical History Error]:', error);
      alert('Error fetching medical history: ' + error.message);
    } finally {
      setLoadingHistory(false);
    }
  };

  // ✅ CONFIRM APPOINTMENT HANDLER
  const handleConfirmAppointment = async (appointmentId) => {
    try {
      if (!window.confirm('Are you sure you want to confirm this appointment?')) {
        return;
      }

      console.log('[Appointment] Confirming appointment:', appointmentId);

      const token = localStorage.getItem('token');
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

      const response = await fetch(`${API_URL}/appointments/${appointmentId}/confirm`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({})
      });

      const data = await response.json();
      console.log('[Appointment] Response:', data);

      if (data.success) {
        alert('Appointment confirmed successfully!');
        loadData();
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error('[Appointment Error]:', error);
      alert('Error confirming appointment: ' + error.message);
    }
  };

  // ✅ FIXED PRESCRIPTION CREATION HANDLER
  const handleCreatePrescription = async () => {
    try {
      console.log('[Prescription] Creating prescription...');

      if (!selectedAppointment) {
        alert('Please select an appointment');
        return;
      }

      if (!prescriptionForm.diagnosis || prescriptionForm.diagnosis.trim() === '') {
        alert('Please enter diagnosis');
        return;
      }

      if (!prescriptionForm.medicines || prescriptionForm.medicines.length === 0) {
        alert('Please add at least one medicine');
        return;
      }

      for (let med of prescriptionForm.medicines) {
        if (!med.name || !med.dosage || !med.frequency || !med.duration) {
          alert('Please fill all medicine details (name, dosage, frequency, duration)');
          return;
        }
      }

      console.log('[Prescription] Appointment:', selectedAppointment);
      console.log('[Prescription] Medicines:', prescriptionForm.medicines);

      const payload = {
        appointmentId: selectedAppointment._id,
        patientId: selectedAppointment.patientId?._id,
        diagnosis: prescriptionForm.diagnosis,
        medicines: prescriptionForm.medicines,
        instructions: prescriptionForm.instructions || '',
        followUpDate: ''
      };

      console.log('[Prescription] Payload:', JSON.stringify(payload, null, 2));

      const response = await prescriptionAPI.create(payload);
      console.log('[Prescription] Response:', response);

      if (response && response.success) {
        console.log('[Prescription] ✅ Prescription created successfully');
        alert('Prescription created successfully!');

        setShowPrescription(false);
        setPrescriptionForm({
          diagnosis: '',
          medicines: [{ name: '', dosage: '', frequency: '', duration: '' }],
          instructions: ''
        });
        setSelectedAppointment(null);

        loadData();
      } else {
        alert('Failed to create prescription: ' + (response?.message || 'Unknown error'));
      }
    } catch (error) {
      console.error('[Prescription Error]:', error);
      alert('Error creating prescription: ' + error.message);
    }
  };

  const addMedicineField = () => {
    setPrescriptionForm({
      ...prescriptionForm,
      medicines: [...prescriptionForm.medicines, { name: '', dosage: '', frequency: '', duration: '' }]
    });
  };

  const removeMedicineField = (index) => {
    const updatedMedicines = prescriptionForm.medicines.filter((_, i) => i !== index);
    setPrescriptionForm({
      ...prescriptionForm,
      medicines: updatedMedicines.length > 0 ? updatedMedicines : [{ name: '', dosage: '', frequency: '', duration: '' }]
    });
  };

  const updateMedicine = (index, field, value) => {
    const updatedMedicines = [...prescriptionForm.medicines];
    updatedMedicines[index][field] = value;
    setPrescriptionForm({
      ...prescriptionForm,
      medicines: updatedMedicines
    });
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
        <div className="doctor-dashboard">
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
      <div className="doctor-dashboard">
        <div className="dashboard-container">
          <div className="dashboard-header">
            <div className="header-left">
              <div className="header-greeting">
                <h1>Welcome, Dr. {user?.firstName}!</h1>
                <p>Manage patient appointments and prescriptions</p>
                <div className="doctor-badge">Medical Professional</div>
              </div>
            </div>
            <div className="header-actions">
              <button className="btn btn-outline" onClick={handleLogout}>
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 17H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M17 16l4-4m0 0l-4-4m4 4H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Logout
              </button>
            </div>
          </div>

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
          </div>

          {activeTab === 'dashboard' && (
            <div className="dashboard-content">
              <div className="stat-card">
                <div className="stat-icon">
                  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2"/>
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
                <div className="stat-number">{appointments.length}</div>
                <div className="stat-label">Patients</div>
              </div>

              <div className="section">
                <h2 className="section-title">
                  <svg viewBox="0 0 24 24" fill="none">
                    <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2"/>
                    <path d="M16 2v4M8 2v4M3 10h18" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                  Upcoming Appointments
                </h2>

                {appointments.filter(a => a.status !== 'completed').length > 0 ? (
                  <div className="appointments-list">
                    {appointments.filter(a => a.status !== 'completed').map(apt => (
                      <div key={apt._id} className="appointment-card">
                        <div className="appointment-date">
                          {new Date(apt.appointmentDate).toLocaleDateString()} at {apt.appointmentTime}
                        </div>
                        <div className="appointment-details">
                          <p><strong>Patient:</strong> {apt.patientId?.userId?.firstName} {apt.patientId?.userId?.lastName}</p>
                          <p><strong>Reason:</strong> {apt.reason}</p>
                          <p><strong>Fee:</strong> Rs{apt.consultationFee}</p>
                        </div>
                        <span className={`appointment-status status-${apt.status}`}>
                          {apt.status.charAt(0).toUpperCase() + apt.status.slice(1)}
                        </span>
                        
                        <div className="appointment-actions">
                          {apt.status === 'pending' && (
                            <button 
                              className="btn btn-success"
                              onClick={() => handleConfirmAppointment(apt._id)}
                            >
                              ✓ Confirm
                            </button>
                          )}
                          <button 
                            className="btn btn-primary"
                            onClick={() => viewPatientHistory(apt.patientId?.userId?._id)}
                            disabled={loadingHistory}
                            title="View Patient Medical History"
                          >
                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" 
                                    stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                              <polyline points="14 2 14 8 20 8" 
                                        stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                              <line x1="9" y1="13" x2="15" y2="13" 
                                    stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                              <line x1="9" y1="17" x2="15" y2="17" 
                                    stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            History
                          </button>
                          <button 
                            className="btn btn-primary"
                            onClick={() => {
                              setSelectedAppointment(apt);
                              setShowPrescription(true);
                            }}
                          >
                            Rx Prescription
                          </button>
                        </div>
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
                  </div>
                )}
              </div>
            </div>
          )}

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
                        <p><strong>Patient:</strong> {apt.patientId?.userId?.firstName} {apt.patientId?.userId?.lastName}</p>
                        <p><strong>Reason:</strong> {apt.reason}</p>
                        <p><strong>Fee:</strong> Rs{apt.consultationFee}</p>
                      </div>
                      <span className={`appointment-status status-${apt.status}`}>
                        {apt.status.charAt(0).toUpperCase() + apt.status.slice(1)}
                      </span>
                      
                      <div className="appointment-actions">
                        {apt.status === 'pending' && (
                          <button 
                            className="btn btn-success"
                            onClick={() => handleConfirmAppointment(apt._id)}
                          >
                            ✓ Confirm
                          </button>
                        )}
                        <button 
                          className="btn btn-primary"
                          onClick={() => viewPatientHistory(apt.patientId?.userId?._id)}
                          disabled={loadingHistory}
                          title="View Patient Medical History"
                        >
                          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" 
                                  stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            <polyline points="14 2 14 8 20 8" 
                                      stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            <line x1="9" y1="13" x2="15" y2="13" 
                                  stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            <line x1="9" y1="17" x2="15" y2="17" 
                                  stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          History
                        </button>
                        {apt.status !== 'completed' && (
                          <button 
                            className="btn btn-primary"
                            onClick={() => {
                              setSelectedAppointment(apt);
                              setShowPrescription(true);
                            }}
                          >
                            Rx Prescription
                          </button>
                        )}
                      </div>
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
                  <p>No appointments</p>
                </div>
              )}
            </div>
          )}
        </div>

        {showPrescription && selectedAppointment && (
          <div className="prescription-modal" onClick={() => setShowPrescription(false)}>
            <div className="prescription-form" onClick={(e) => e.stopPropagation()}>
              <h2>Create Prescription for {selectedAppointment.patientId?.userId?.firstName}</h2>
              
              <div className="form-group">
                <label>Diagnosis *</label>
                <textarea 
                  value={prescriptionForm.diagnosis}
                  onChange={(e) => setPrescriptionForm({ ...prescriptionForm, diagnosis: e.target.value })}
                  placeholder="Enter diagnosis..."
                  rows="3"
                  required
                />
              </div>

              <div className="form-group">
                <label>Medicines *</label>
                {prescriptionForm.medicines.map((medicine, index) => (
                  <div key={index} className="medicine-item">
                    <div className="medicine-inputs-full">
                      <input
                        type="text"
                        placeholder="Medicine Name (e.g., Aspirin)"
                        value={medicine.name}
                        onChange={(e) => updateMedicine(index, 'name', e.target.value)}
                        required
                      />
                      <input
                        type="text"
                        placeholder="Dosage (e.g., 500mg)"
                        value={medicine.dosage}
                        onChange={(e) => updateMedicine(index, 'dosage', e.target.value)}
                        required
                      />
                      <input
                        type="text"
                        placeholder="Frequency (e.g., Twice daily)"
                        value={medicine.frequency}
                        onChange={(e) => updateMedicine(index, 'frequency', e.target.value)}
                        required
                      />
                      <input
                        type="text"
                        placeholder="Duration (e.g., 7 days)"
                        value={medicine.duration}
                        onChange={(e) => updateMedicine(index, 'duration', e.target.value)}
                        required
                      />
                    </div>
                    {prescriptionForm.medicines.length > 1 && (
                      <button
                        type="button"
                        className="remove-medicine-btn"
                        onClick={() => removeMedicineField(index)}
                      >
                        Remove
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  className="add-medicine-btn"
                  onClick={addMedicineField}
                >
                  + Add Another Medicine
                </button>
              </div>

              <div className="form-group">
                <label>Instructions</label>
                <textarea 
                  value={prescriptionForm.instructions}
                  onChange={(e) => setPrescriptionForm({ ...prescriptionForm, instructions: e.target.value })}
                  placeholder="Special instructions for patient (optional)..."
                  rows="3"
                />
              </div>

              <div className="form-actions">
                <button 
                  className="btn btn-outline" 
                  onClick={() => setShowPrescription(false)}
                  style={{ flex: 1 }}
                >
                  Cancel
                </button>
                <button 
                  className="btn btn-primary" 
                  onClick={handleCreatePrescription}
                  style={{ flex: 1 }}
                >
                  Create Prescription
                </button>
              </div>
            </div>
          </div>
        )}

        {showMedicalHistory && selectedPatientHistory && (
          <div className="medical-history-modal" onClick={() => setShowMedicalHistory(false)}>
            <div className="medical-history-content" onClick={(e) => e.stopPropagation()}>
              <h2>
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" 
                        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <polyline points="14 2 14 8 20 8" 
                            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M10 13h4a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1z" 
                        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Patient Medical History
              </h2>

              <div className="history-section">
                <h3>Physical Information</h3>
                <p><strong>Height:</strong> <span className="history-value">{selectedPatientHistory.height || 'Not provided'}</span></p>
                <p><strong>Weight:</strong> <span className="history-value">{selectedPatientHistory.weight || 'Not provided'}</span></p>
                <p><strong>Blood Pressure:</strong> <span className="history-value">{selectedPatientHistory.bloodPressure || 'Not provided'}</span></p>
                <p><strong>Blood Group:</strong> <span className="history-value">{selectedPatientHistory.bloodGroup || 'Not provided'}</span></p>
              </div>

              <div className="history-section">
                <h3>Medical Conditions</h3>
                <p><strong>Chronic Diseases:</strong> <span className="history-value">{selectedPatientHistory.chronicDiseases || 'None reported'}</span></p>
                <p><strong>Previous Surgeries:</strong> <span className="history-value">{selectedPatientHistory.surgeries || 'None reported'}</span></p>
                <p><strong>Past Injuries:</strong> <span className="history-value">{selectedPatientHistory.injuries || 'None reported'}</span></p>
              </div>

              <div className="history-section">
                <h3>Allergies</h3>
                <p><strong>Medicine Allergies:</strong> <span className="history-value">{selectedPatientHistory.medicineAllergies || 'None reported'}</span></p>
                <p><strong>Food Allergies:</strong> <span className="history-value">{selectedPatientHistory.foodAllergies || 'None reported'}</span></p>
                <p><strong>Other Allergies:</strong> <span className="history-value">{selectedPatientHistory.otherAllergies || 'None reported'}</span></p>
              </div>

              <div className="history-section">
                <h3>Current Medications</h3>
                <p><span className="history-value">{selectedPatientHistory.currentMedications || 'None reported'}</span></p>
              </div>

              <div className="history-section">
                <h3>Lifestyle</h3>
                <p><strong>Smoking:</strong> <span className="history-value">{selectedPatientHistory.smokingStatus || 'Not provided'}</span></p>
                <p><strong>Alcohol:</strong> <span className="history-value">{selectedPatientHistory.alcoholConsumption || 'Not provided'}</span></p>
                <p><strong>Exercise:</strong> <span className="history-value">{selectedPatientHistory.exerciseFrequency || 'Not provided'}</span></p>
              </div>

              <div className="history-section">
                <h3>Family History</h3>
                <p><span className="history-value">{selectedPatientHistory.familyHistory || 'None reported'}</span></p>
              </div>

              <div className="modal-actions">
                <button className="modal-close-btn" onClick={() => setShowMedicalHistory(false)}>
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default DoctorDashboard;