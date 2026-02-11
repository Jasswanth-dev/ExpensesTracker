import React from 'react';
import './index.css';

const ConfirmationPopup = ({ message, onConfirm, onCancel }) => {
  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <p>{message}</p>
        <div className="popup-actions">
          <button className="custom-btn-style" onClick={onConfirm}>Confirm</button>
          <button className="custom-btn-style" onClick={onCancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationPopup;
