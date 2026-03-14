import React from 'react';

const Button = ({
  children,
  type = 'button',
  variant = 'primary',
  size = 'medium',
  fullWidth = false,
  disabled = false,
  loading = false,
  icon,
  onClick,
  className = '',
}) => {
  const buttonStyles = `
    .btn {
      border: none;
      border-radius: 8px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      font-family: inherit;
      font-size: 0.95rem;
    }

    .btn:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    .btn-primary {
      background: linear-gradient(135deg, #FF7A45 0%, #FF6B35 100%);
      color: white;
      box-shadow: 0 4px 12px rgba(255, 122, 69, 0.3);
    }

    .btn-primary:hover:not(:disabled) {
      transform: translateY(-2px);
      box-shadow: 0 8px 20px rgba(255, 122, 69, 0.4);
    }

    .btn-secondary {
      background: white;
      color: #1a6b63;
      border: 2px solid #1a6b63;
    }

    .btn-secondary:hover:not(:disabled) {
      background: #1a6b63;
      color: white;
    }

    .btn-outline {
      background: transparent;
      color: #1a6b63;
      border: 2px solid #1a6b63;
    }

    .btn-outline:hover:not(:disabled) {
      background: #1a6b63;
      color: white;
    }

    .btn-danger {
      background: #ff6b6b;
      color: white;
    }

    .btn-danger:hover:not(:disabled) {
      background: #ff5252;
      transform: translateY(-2px);
    }

    .btn-success {
      background: #51cf66;
      color: white;
    }

    .btn-success:hover:not(:disabled) {
      background: #40c057;
      transform: translateY(-2px);
    }

    .btn-small {
      padding: 0.5rem 1rem;
      font-size: 0.85rem;
    }

    .btn-medium {
      padding: 0.75rem 1.5rem;
      font-size: 0.95rem;
    }

    .btn-large {
      padding: 1rem 2rem;
      font-size: 1.05rem;
    }

    .btn-fullwidth {
      width: 100%;
    }

    .btn-icon {
      width: 20px;
      height: 20px;
    }

    .btn-icon svg {
      width: 100%;
      height: 100%;
      stroke: currentColor;
      fill: none;
      stroke-width: 2;
    }

    .spinner {
      display: inline-block;
      width: 16px;
      height: 16px;
      border: 2px solid rgba(255, 255, 255, 0.3);
      border-top-color: white;
      border-radius: 50%;
      animation: spin 0.8s linear infinite;
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }
  `;

  const sizeClass = `btn-${size}`;
  const variantClass = `btn-${variant}`;
  const fullWidthClass = fullWidth ? 'btn-fullwidth' : '';

  return (
    <>
      <style>{buttonStyles}</style>
      <button
        type={type}
        className={`btn ${sizeClass} ${variantClass} ${fullWidthClass} ${className}`}
        disabled={disabled || loading}
        onClick={onClick}
      >
        {loading ? <div className="spinner"></div> : icon && <div className="btn-icon">{icon}</div>}
        {children}
      </button>
    </>
  );
};

export default Button;