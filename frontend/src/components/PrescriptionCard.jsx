import React from 'react';

const PrescriptionCard = ({ prescription, onDownload }) => {
  return (
    <div style={{
      background: 'white',
      borderRadius: '8px',
      padding: '1.5rem',
      marginBottom: '1.5rem',
      boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
      borderLeft: '4px solid #1F6F64'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
        <div>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#1F6F64', margin: '0 0 0.5rem 0' }}>
            Dr. {prescription.doctorId.userId.firstName} {prescription.doctorId.userId.lastName}
          </h3>
          <p style={{ color: '#666', margin: '0 0 0.25rem 0', fontSize: '0.9rem' }}>
            Specialization: {prescription.doctorId.specialization}
          </p>
          <p style={{ color: '#999', margin: 0, fontSize: '0.85rem' }}>
            Issued: {new Date(prescription.issuedDate).toLocaleDateString()}
          </p>
        </div>
        <button
          onClick={() => onDownload(prescription._id)}
          style={{
            padding: '0.75rem 1.5rem',
            background: '#1F6F64',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            fontWeight: 600,
            fontSize: '0.9rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}
        >
          📥 Download PDF
        </button>
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <h4 style={{ fontSize: '0.95rem', fontWeight: 600, color: '#333', marginBottom: '0.5rem' }}>Diagnosis:</h4>
        <p style={{ color: '#666', margin: 0, fontSize: '0.9rem' }}>{prescription.diagnosis}</p>
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <h4 style={{ fontSize: '0.95rem', fontWeight: 600, color: '#333', marginBottom: '0.5rem' }}>Medicines:</h4>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
            <thead>
              <tr style={{ background: '#f5f5f5' }}>
                <th style={{ padding: '0.5rem', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Medicine</th>
                <th style={{ padding: '0.5rem', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Dosage</th>
                <th style={{ padding: '0.5rem', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Frequency</th>
                <th style={{ padding: '0.5rem', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Duration</th>
              </tr>
            </thead>
            <tbody>
              {prescription.medicines.map((med, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid #eee' }}>
                  <td style={{ padding: '0.5rem' }}>{med.name}</td>
                  <td style={{ padding: '0.5rem' }}>{med.dosage}</td>
                  <td style={{ padding: '0.5rem' }}>{med.frequency}</td>
                  <td style={{ padding: '0.5rem' }}>{med.duration}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {prescription.instructions && (
        <div style={{ marginBottom: '1rem' }}>
          <h4 style={{ fontSize: '0.95rem', fontWeight: 600, color: '#333', marginBottom: '0.5rem' }}>Instructions:</h4>
          <p style={{ color: '#666', margin: 0, fontSize: '0.9rem' }}>{prescription.instructions}</p>
        </div>
      )}

      {prescription.followUpDate && (
        <div>
          <h4 style={{ fontSize: '0.95rem', fontWeight: 600, color: '#333', marginBottom: '0.5rem' }}>Follow-up Date:</h4>
          <p style={{ color: '#666', margin: 0, fontSize: '0.9rem' }}>{new Date(prescription.followUpDate).toLocaleDateString()}</p>
        </div>
      )}
    </div>
  );
};

export default PrescriptionCard;