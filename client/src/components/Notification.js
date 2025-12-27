import React, { useEffect } from "react";
import "./Notification.css";

const Notification = ({ message, type, onClose }) => {
 
  useEffect(() => {
    const timer = setTimeout(onClose, 2500);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`notification ${type}`}>
      <div className="notification-content">
        {type === "success" ? (
          <span className="icon">✅</span>
        ) : (
          <span className="icon">❌</span>
        )}
        <span className="message">{message}</span>
      </div>
    </div>
  );
};

export default Notification;
