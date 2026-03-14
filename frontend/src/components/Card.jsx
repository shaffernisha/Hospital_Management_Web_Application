import React from 'react';

const Card = ({ title, value, icon, color = 'primary', trend = null }) => {
  const cardStyles = `
    .card {
      background: white;
      border-radius: 12px;
      padding: 1.5rem;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      transition: all 0.3s;
    }

    .card:hover {
      transform: translateY(-4px);
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
    }

    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: start;
      margin-bottom: 1rem;
    }

    .card-icon {
      font-size: 2rem;
      opacity: 0.8;
    }

    .card-icon.primary {
      color: #1a6b63;
    }

    .card-icon.accent {
      color: #FF7A45;
    }

    .card-icon.success {
      color: #51cf66;
    }

    .card-icon.error {
      color: #ff6b6b;
    }

    .card-title {
      color: #666;
      font-size: 0.95rem;
      font-weight: 600;
      margin: 0;
    }

    .card-value {
      font-size: 2rem;
      font-weight: 700;
      color: #1a6b63;
      margin: 0.5rem 0;
    }

    .card-trend {
      font-size: 0.85rem;
      margin-top: 0.5rem;
      padding: 0.5rem 0.75rem;
      border-radius: 6px;
      display: inline-block;
    }

    .trend-up {
      background: #d3f9d8;
      color: #2b8a3e;
    }

    .trend-down {
      background: #ffe0e0;
      color: #c92a2a;
    }

    body.dark-mode .card {
      background: #2d2d2d;
    }

    body.dark-mode .card-title {
      color: #b0b0b0;
    }

    body.dark-mode .card-value {
      color: #FF7A45;
    }
  `;

  return (
    <>
      <style>{cardStyles}</style>
      <div className="card">
        <div className="card-header">
          <div>
            <h3 className="card-title">{title}</h3>
            <div className="card-value">{value}</div>
          </div>
          <div className={`card-icon ${color}`}>{icon}</div>
        </div>
        {trend && (
          <span className={`card-trend ${trend.type === 'up' ? 'trend-up' : 'trend-down'}`}>
            {trend.type === 'up' ? '📈' : '📉'} {trend.value}
          </span>
        )}
      </div>
    </>
  );
};

export default Card;