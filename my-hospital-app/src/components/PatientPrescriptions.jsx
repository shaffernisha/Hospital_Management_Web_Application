import React, { useState, useEffect } from 'react';
// shows all prescriptions for a patient, with PDF download
const PatientPrescriptions = ({ prescriptions = [] }) => {
  const [localPrescriptions, setLocalPrescriptions] = useState(prescriptions);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLocalPrescriptions(prescriptions);
  }, [prescriptions]);

  const downloadPDF = async (prescriptionId) => {
    try {
      const token = localStorage.getItem('token');
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

      const response = await fetch(`${API_URL}/prescriptions/${prescriptionId}/download`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to download PDF');
      }
// create a temp link and click it to trigger download
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `prescription_${prescriptionId}.pdf`;
      document.body.appendChild(a);
      a.click();
       // cleanup
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      alert('Error downloading PDF: ' + error.message);
    }
  };

  const styles = `
    .prescriptions-container {
      width: 100%;
    }

    .prescriptions-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
      gap: 1.5rem;
    }

    .prescription-card {
      background: white;
      border: 2px solid #e9ecef;
      border-radius: 12px;
      padding: 1.5rem;
      transition: all 0.3s;
      border-left: 5px solid #1a6b63;
    }

    .prescription-card:hover {
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
      transform: translateY(-4px);
      border-left-color: #FF7A45;
    }

    .prescription-header {
      display: flex;
      justify-content: space-between;
      align-items: start;
      margin-bottom: 1rem;
      border-bottom: 2px solid #f0f4f8;
      padding-bottom: 1rem;
    }

    .prescription-date {
      font-weight: 700;
      color: #1a6b63;
      font-size: 1rem;
    }

    .prescription-status {
      display: inline-block;
      background: #d1ecf1;
      color: #0c5460;
      padding: 0.4rem 0.8rem;
      border-radius: 20px;
      font-size: 0.75rem;
      font-weight: 600;
    }

    .prescription-body {
      margin-bottom: 1.5rem;
    }

    .prescription-detail {
      margin-bottom: 1rem;
    }

    .prescription-label {
      font-weight: 600;
      color: #666;
      font-size: 0.85rem;
      margin-bottom: 0.3rem;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .prescription-value {
      color: #333;
      line-height: 1.5;
      font-size: 0.95rem;
    }

    .doctor-info {
      background: #f8f9fa;
      padding: 1rem;
      border-radius: 8px;
      margin-bottom: 1rem;
    }

    .doctor-name {
      font-weight: 700;
      color: #1a6b63;
      margin-bottom: 0.3rem;
    }

    .doctor-specialty {
      color: #FF7A45;
      font-size: 0.9rem;
      font-weight: 600;
    }

    .medicines-list {
      background: #f8f9fa;
      padding: 1rem;
      border-radius: 8px;
      margin-bottom: 1rem;
    }

    .medicines-title {
      font-weight: 700;
      color: #1a6b63;
      margin-bottom: 0.75rem;
      font-size: 0.95rem;
    }

    .medicine-item {
      color: #666;
      font-size: 0.9rem;
      line-height: 1.6;
      margin-bottom: 0.5rem;
    }

    .medicine-item:last-child {
      margin-bottom: 0;
    }

    .prescription-actions {
      display: flex;
      gap: 0.75rem;
    }

    .action-btn {
      flex: 1;
      padding: 0.6rem;
      border: none;
      border-radius: 6px;
      font-weight: 600;
      cursor: pointer;
      font-size: 0.85rem;
      transition: all 0.3s;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
    }

    .btn-download {
      background: linear-gradient(135deg, #FF7A45 0%, #FF6B35 100%);
      color: white;
      box-shadow: 0 2px 8px rgba(255, 122, 69, 0.2);
    }

    .btn-download:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(255, 122, 69, 0.3);
    }

    .btn-view {
      background: white;
      color: #1a6b63;
      border: 2px solid #1a6b63;
    }

    .btn-view:hover {
      background: #1a6b63;
      color: white;
    }

    .empty-prescriptions {
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

    .empty-prescriptions p {
      font-size: 1.05rem;
      margin-bottom: 0.5rem;
    }

    .empty-prescriptions small {
      color: #999;
      font-size: 0.9rem;
    }

    .loading {
      text-align: center;
      padding: 2rem;
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
      .prescriptions-grid {
        grid-template-columns: 1fr;
      }

      .prescription-actions {
        flex-direction: column;
      }
    }
  `;

  return (
    <>
      <style>{styles}</style>
      <div className="prescriptions-container">
        {loading ? (
          <div className="loading">
            <div className="loading-spinner"></div>
            <p>Loading prescriptions...</p>
          </div>
        ) : localPrescriptions && localPrescriptions.length > 0 ? (
          <div className="prescriptions-grid">
            {localPrescriptions.map((prescription) => (
              <div key={prescription._id} className="prescription-card">
                <div className="prescription-header">
                  <div>
                    <div className="prescription-date">
                      {new Date(prescription.issuedDate).toLocaleDateString('en-IN', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </div>
                  </div>
                  <span className="prescription-status">Active</span>
                </div>

                <div className="doctor-info">
                  <div className="doctor-name">
                    Dr. {prescription.doctorId?.userId?.firstName} {prescription.doctorId?.userId?.lastName}
                  </div>
                  <div className="doctor-specialty">
                    {prescription.doctorId?.specialization || 'General Practitioner'}
                  </div>
                </div>

                <div className="prescription-body">
                  <div className="prescription-detail">
                    <div className="prescription-label">Diagnosis</div>
                    <div className="prescription-value">
                      {prescription.diagnosis}
                    </div>
                  </div>

                  {prescription.medicines && prescription.medicines.length > 0 && (
                    <div className="medicines-list">
                      <div className="medicines-title">Medicines</div>
                      {prescription.medicines.map((medicine, index) => (
                        <div key={index} className="medicine-item">
                          <strong>{medicine.name}</strong> - {medicine.dosage} ({medicine.frequency})
                        </div>
                      ))}
                    </div>
                  )}

                  {prescription.instructions && (
                    <div className="prescription-detail">
                      <div className="prescription-label">Instructions</div>
                      <div className="prescription-value">
                        {prescription.instructions}
                      </div>
                    </div>
                  )}

                  {prescription.followUpDate && (
                    <div className="prescription-detail">
                      <div className="prescription-label">Follow-up Date</div>
                      <div className="prescription-value">
                        {new Date(prescription.followUpDate).toLocaleDateString('en-IN')}
                      </div>
                    </div>
                  )}
                </div>

                <div className="prescription-actions">
                  <button 
                    className="action-btn btn-download"
                    onClick={() => downloadPDF(prescription._id)}
                  >
                    <svg viewBox="0 0 24 24" fill="none" width="16" height="16">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                      <polyline points="7 10 12 15 17 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                      <line x1="12" y1="15" x2="12" y2="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                    Download PDF
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-prescriptions">
            <div className="empty-icon">
              <svg viewBox="0 0 24 24" fill="none">
                <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/>
                <polyline points="13 2 13 9 20 9"/>
              </svg>
            </div>
            <p>No prescriptions yet</p>
            <small>Prescriptions from your doctor appointments will appear here</small>
          </div>
        )}
      </div>
    </>
  );
};

export default PatientPrescriptions;