import React, { useState } from "react";
import emailjs from "emailjs-com";
import "./TicketCard.css";
import { useNotification } from "../context/NotificationContext";

function TicketCard({ ticket, showStatusDropdown, updateTicketStatus, showEmailButton, removeTicket }) {
  
   const { showNotification } = useNotification();
   const [showModal, setShowModal] = useState(false);
   const [fullscreenImage, setFullscreenImage] = useState(null);
   const [emailData, setEmailData] = useState({
    to: ticket.email,
    message: ""
  });

   
   if (!ticket) return null;
   
   const student = ticket.student || {};
   const dbId = ticket._id; 
   
   const plainMessage = ticket.message?.replace(/<[^>]+>/g, "") || "";

    const sendAcknowledgement = () => {
    emailjs
      .send(
        "service_ngootpr",
        "template_wo0sy7f",
        {
          to_name: student.name,
          ticket_id: ticket.ticketId,
          email: student.email,
        },
        "7-5RTE31y78OuMw32"
      )
      .then(() => {
        showNotification(`Email sent to ${student.email}`,"success");
      })
      .catch((err) => {
        console.error("FAILED...", err);
        showNotification("Failed to send email","error");
      });
  };

  const handleSendEmail = () => {
    emailjs
      .send(
        "service_ngootpr",
        "template_u030ndb",
        {
          to_name: student.name,
          ticket_id: ticket.ticketId,           
          email: student.email,
          message: emailData.message,
        },
        "7-5RTE31y78OuMw32"
      )
      .then(() => {
        showNotification(`Email sent to ${student.email}`,"success");
        setShowModal(false);
      })
      .catch((err) => {
        console.error("FAILED...", err);
        showNotification("Failed to send email","error");
      });
  };

  const handleStatusChange = (e) => {
    updateTicketStatus(dbId, e.target.value);
  };

  return (
    <div className="ticket-card">
      <p><strong>Ticket ID:</strong> {ticket.ticketId}</p>
      <p><strong>Name:</strong> {student.name}</p>
      <p><strong>Email:</strong> {student.email}</p>
      <p><strong>Subject:</strong> {ticket.subject}</p>

      <div className="message-content">
        <strong>Message:</strong>
         <div className="formatted-message">{plainMessage}</div>
      </div>

      {showStatusDropdown ? (
        <p>
          <strong>Status:</strong>
          <select
            value={ticket.status}
            onChange={handleStatusChange}
            className={`status-${ticket.status.toLowerCase()}`}
          >
            <option value="pending">Pending</option>
            <option value="in-Progress">In Progress</option>
            <option value="resolved">Resolved</option>
          </select>
        </p>
      ) : (
        <p>
          <strong>Status:</strong>{" "}
          <span className={`status-${ticket.status.toLowerCase()}`}>{ticket.status}</span>
        </p>
      )}

      {(showEmailButton || removeTicket) && (
        <div className="btn-grp">
          {showEmailButton && (
            <>
              <button className="email-btn" onClick={sendAcknowledgement}>
                Send Acknowledgement
              </button>

              <button className="email-btn" onClick={() => setShowModal(true)}>
                Compose Email
              </button>
            </>
          )}

          {removeTicket && (
            <button className="remove-btn" onClick={() => removeTicket(dbId)}>
               ✕
            </button>
          )}
        </div>
      )}

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowModal(false)}>
              ✕
            </button>

            <h3>Compose Email</h3>
            <textarea
              placeholder="Message"
              value={emailData.message}
              onChange={(e) => setEmailData({ ...emailData, message: e.target.value })}
            />
            
            <button className="e-btn" onClick={handleSendEmail}>
              Send
            </button>
          </div>
        </div>
      )}

      
      { Array.isArray(ticket.attachments) && ticket.attachments.length > 0 && (
        <div className="attachments">
          <strong>Attachments:</strong>

          <div className="preview-container">
            {ticket.attachments.map((file, index) => (
              <div key={index} className="preview-item">
                {file.fileType.startsWith("image/") ? (
                  <img
                    src={`http://localhost:5000${file.fileUrl}`}
                    alt={file.fileName}
                    className="preview-img"
                    onClick={() => setFullscreenImage((`http://localhost:5000${file.fileUrl}`))}
                  />
                ) : (
                  <a href={`http://localhost:5000${file.fileUrl}`} target="_blank" rel="noopener noreferrer">
                    {file.fileName}
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {fullscreenImage && (
        <div className="fullscreen-overlay" onClick={() => setFullscreenImage(null)}>
          <div className="fullscreen-wrapper" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setFullscreenImage(null)}>✕</button>
            <img src={fullscreenImage} alt="Fullscreen" className="fullscreen-img" />
          </div>
        </div>
      )}
    </div>
  );
}

export default TicketCard;
