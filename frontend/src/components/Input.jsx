
import React from 'react';

const Input = ({
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
  icon,
  required = false,
  disabled = false,
}) => {
  const inputStyles = `
    .input-group {
      margin-bottom: 1.25rem;
      display: flex;
      flex-direction: column;
    }

    .input-label {
      font-weight: 600;
      color: #1a6b63;
      display: block;
      margin-bottom: 0.5rem;
      font-size: 0.9rem;
    }

    .input-label .required {
      color: #ff6b6b;
    }

    .input-wrapper {
      position: relative;
      display: flex;
      align-items: center;
    }

    .input-icon {
      position: absolute;
      left: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #1a6b63;
      pointer-events: none;
      width: 20px;
      height: 20px;
    }

    .input-icon svg {
      width: 100%;
      height: 100%;
      stroke: currentColor;
      fill: none;
    }

    .form-input {
      width: 100%;
      padding: 0.9rem 1.1rem;
      border: 2px solid #e9ecef;
      border-radius: 8px;
      font-size: 1rem;
      background: #ffffff;
      color: #1a6b63;
      font-family: inherit;
      transition: all 0.3s ease;
    }

    .input-with-icon {
      padding-left: 2.75rem;
    }

    .form-input:focus {
      outline: none;
      border-color: #1a6b63;
      box-shadow: 0 0 0 3px rgba(26, 107, 99, 0.1);
    }

    .form-input:disabled {
      background: #f5f5f5;
      color: #999;
      cursor: not-allowed;
    }

    .form-input.error {
      border-color: #ff6b6b;
      box-shadow: 0 0 0 3px rgba(255, 107, 107, 0.1);
    }

    .input-error {
      color: #ff6b6b;
      font-size: 0.8rem;
      margin-top: 0.4rem;
      display: flex;
      align-items: center;
      gap: 0.4rem;
    }

    .input-error svg {
      width: 14px;
      height: 14px;
      stroke: #ff6b6b;
    }
  `;

  return (
    <>
      <style>{inputStyles}</style>
      <div className="input-group">
        {label && (
          <label className="input-label">
            {label}
            {required && <span className="required"> *</span>}
          </label>
        )}
        <div className="input-wrapper">
          {icon && <div className="input-icon">{icon}</div>}
          <input
            type={type}
            className={`form-input ${icon ? 'input-with-icon' : ''} ${error ? 'error' : ''}`}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            disabled={disabled}
          />
        </div>
        {error && (
          <div className="input-error">
            <svg viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
              <line x1="12" y1="8" x2="12" y2="12" stroke="currentColor" strokeWidth="2" />
              <line x1="12" y1="16" x2="12.01" y2="16" stroke="currentColor" strokeWidth="2" />
            </svg>
            {error}
          </div>
        )}
      </div>
    </>
  );
};

export default Input;
