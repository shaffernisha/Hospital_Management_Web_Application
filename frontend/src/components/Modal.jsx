import React from 'react';

const Modal = ({ isOpen, title, onClose, children, size = 'medium' }) => {
  const modalStyles = `
    .modal-overlay {
      display: ${isOpen ? 'flex' : 'none'};
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.5);
      justify-content: center;
      align-items: center;
      z-index: 1000;
      animation: fadeIn 0.3s;
    }

    .modal {
      background: white;
      border-radius: 12px;
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
      width: ${size === 'small' ? '400px' : size === 'large' ? '800px' : '600px'};
      max-height: 90vh;
      overflow-y: auto;
      animation: slideUp 0.3s;
    }

    .modal-header {
      padding: 1.5rem;
      border-bottom: 1px solid #e9ecef;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .modal-title {
      font-size: 1.5rem;
      font-weight: 700;
      color: #1a6b63;
      margin: 0;
    }

    .modal-close {
      background: none;
      border: none;
      font-size: 1.5rem;
      cursor: pointer;
      color: #666;
      transition: all 0.3s;
    }

    .modal-close:hover {
      color: #FF7A45;
    }

    .modal-body {
      padding: 1.5rem;
    }

    .modal-footer {
      padding: 1.5rem;
      border-top: 1px solid #e9ecef;
      display: flex;
      gap: 1rem;
      justify-content: flex-end;
    }

    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    @keyframes slideUp {
      from { transform: translateY(20px); opacity: 0; }
      to { transform: translateY(0); opacity: 1; }
    }

    @media (max-width: 768px) {
      .modal {
        width: 90%;
      }
    }

    body.dark-mode .modal {
      background: #2d2d2d;
      color: #e0e0e0;
    }

    body.dark-mode .modal-header {
      border-bottom-color: #444;
    }

    body.dark-mode .modal-footer {
      border-top-color: #444;
    }
  `;

  if (!isOpen) return null;

  return (
    <>
      <style>{modalStyles}</style>
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal" onClick={(e) => e.stopPropagation()}>
          <div className="modal-header">
            <h2 className="modal-title">{title}</h2>
            <button className="modal-close" onClick={onClose}>×</button>
          </div>
          <div className="modal-body">
            {children}
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;