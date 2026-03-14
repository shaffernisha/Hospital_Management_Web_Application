import React, { useState } from 'react';
// reusable form
const Form = ({ fields, onSubmit, loading = false }) => {
  const [formData, setFormData] = useState(
    fields.reduce((acc, field) => ({
      ...acc,
      [field.name]: field.value || ''
    }), {})
  );

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    // handle checkbox separately
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const formStyles = `
    .form {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }

    .form-group {
      display: flex;
      flex-direction: column;
    }

    .form-label {
      margin-bottom: 0.5rem;
      font-weight: 600;
      color: #333;
      font-size: 0.95rem;
    }

    .form-input, .form-textarea, .form-select {
      padding: 0.75rem;
      border: 2px solid #e9ecef;
      border-radius: 8px;
      font-size: 1rem;
      font-family: inherit;
      transition: all 0.3s;
    }

    .form-input:focus, .form-textarea:focus, .form-select:focus {
      outline: none;
      border-color: #1a6b63;
      box-shadow: 0 0 0 3px rgba(26, 107, 99, 0.1);
    }

    .form-textarea {
      resize: vertical;
      min-height: 120px;
    }

    .form-error {
      color: #ff6b6b;
      font-size: 0.85rem;
      margin-top: 0.25rem;
    }

    .form-group.error .form-input,
    .form-group.error .form-textarea,
    .form-group.error .form-select {
      border-color: #ff6b6b;
    }

    .form-checkbox {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }

    .form-checkbox input {
      width: 20px;
      height: 20px;
      cursor: pointer;
    }

    .form-buttons {
      display: flex;
      gap: 1rem;
      margin-top: 1rem;
    }

    .form-btn {
      flex: 1;
      padding: 0.75rem 1.5rem;
      border: none;
      border-radius: 8px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s;
      font-size: 1rem;
    }

    .btn-submit {
      background: linear-gradient(135deg, #FF7A45 0%, #FF6B35 100%);
      color: white;
    }

    .btn-submit:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 20px rgba(255, 122, 69, 0.4);
    }

    .btn-submit:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .btn-cancel {
      background: #e9ecef;
      color: #333;
    }

    .btn-cancel:hover {
      background: #dee2e6;
    }

    body.dark-mode .form-label {
      color: #e0e0e0;
    }

    body.dark-mode .form-input,
    body.dark-mode .form-textarea,
    body.dark-mode .form-select {
      background: #3a3a3a;
      color: #e0e0e0;
      border-color: #444;
    }

    body.dark-mode .btn-cancel {
      background: #444;
      color: #e0e0e0;
    }
  `;

  return (
    <>
      <style>{formStyles}</style>
      <form onSubmit={handleSubmit} className="form">
        {fields.map(field => (
          <div 
            key={field.name} 
            className={`form-group ${errors[field.name] ? 'error' : ''}`}
          >
            {field.type === 'checkbox' ? (
              <label className="form-checkbox">
                <input
                  type="checkbox"
                  name={field.name}
                  checked={formData[field.name]}
                  onChange={handleChange}
                />
                <span>{field.label}</span>
              </label>
            ) : (
              <>
                <label className="form-label">{field.label}</label>
                {field.type === 'textarea' ? (
                  <textarea
                    name={field.name}
                    className="form-textarea"
                    placeholder={field.placeholder}
                    value={formData[field.name]}
                    onChange={handleChange}
                    required={field.required}
                  />
                ) : field.type === 'select' ? (
                  <select
                    name={field.name}
                    className="form-select"
                    value={formData[field.name]}
                    onChange={handleChange}
                    required={field.required}
                  >
                    <option value="">Select {field.label}</option>
                    {field.options?.map(opt => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    type={field.type || 'text'}
                    name={field.name}
                    className="form-input"
                    placeholder={field.placeholder}
                    value={formData[field.name]}
                    onChange={handleChange}
                    required={field.required}
                  />
                )}
              </>
            )}
            {errors[field.name] && (
              <span className="form-error">{errors[field.name]}</span>
            )}
          </div>
        ))}
        <div className="form-buttons">
          <button type="submit" className="form-btn btn-submit" disabled={loading}>
            {loading ? 'Loading...' : 'Submit'}
          </button>
        </div>
      </form>
    </>
  );
};

export default Form;