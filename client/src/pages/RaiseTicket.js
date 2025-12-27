import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./RaiseTicket.css";
import { useNotification } from "../context/NotificationContext";

function RaiseTicket({ addTicket, user }) {
  
  const { showNotification } = useNotification();
  
  const [ticket, setTicket] = useState({
    subject: "",
    message: "",
  });
  const [attachments, setAttachments] = useState([]);

  const student = user;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTicket((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

 const handleFileChange = (e) => {
  const files = Array.from(e.target.files);

  const newFiles = files.map((file) => ({
    name: file.name,
    type: file.type,
    url: URL.createObjectURL(file),
    fileObj: file   
  }));

  setAttachments((prev) => [...prev, ...newFiles]);
};


  const handleRemoveFile = (index) => {
    setAttachments((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!student) {
    showNotification("Please login first!", "error");
    return;
  }

  if (!ticket.subject.trim() || !ticket.message.trim()) {
    showNotification("Please fill all required fields!", "error");
    return;
  }

  const formData = new FormData();
  formData.append("subject", ticket.subject);
  formData.append("message", ticket.message);
 
  attachments.forEach((file) => {
    formData.append("attachments", file.fileObj);
  });

  try {
    const response = await fetch("http://localhost:5000/api/tickets", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      },
      body: formData
    });

    if (!response.ok) throw new Error("Failed to submit ticket");

    showNotification("Ticket raised successfully!", "success");

    setTicket({ subject: "", message: "" });
    setAttachments([]);

  } catch (error) {
    console.error(error);
    showNotification("Error submitting ticket", "error");
  }
};

  return (
    <div className="raise-ticket-page">
     <div className="raise-ticket-container">
      <h2>Raise a New Ticket</h2>

      {student && (
        <p className="logged-in">
          Logged in as: <strong>{student.name}</strong> ({student.rollNumber})
        </p>
      )}

      <form onSubmit={handleSubmit} className="raise-ticket-form">
        <label>Subject:</label>
        <input
          type="text"
          name="subject"
          value={ticket.subject}
          onChange={handleChange}
          placeholder="Enter your ticket subject"
          required
        />

        <label>Message:</label>
        <ReactQuill
          theme="snow"
          value={ticket.message}
          onChange={(value) => setTicket((prev) => ({ ...prev, message: value }))}
          placeholder="Type your message here..."
          className="quill-editor"
          modules={{
            toolbar: [
              [{ header: [1, 2, false] }],
              ["bold", "italic", "underline", "blockquote"],
              [{ list: "ordered" }, { list: "bullet" }],
              ["link"],
              ["clean"],
            ],
          }}
        />

        <label>Attachments (optional):</label>
        <input
          type="file"
          accept="image/*,application/pdf"
          multiple
          onChange={handleFileChange}
        />

        <div className="file-preview">
          {attachments.map((file, idx) => (
            <div key={idx} className="preview-item">
              {file.type.startsWith("image/") ? (
                <img src={file.url} alt="preview" className="preview-img" />
              ) : (
                <img
                  src="https://cdn-icons-png.flaticon.com/512/337/337946.png"
                  alt="File icon"
                  className="file-icon"
                />
              )}

              <button
                type="button"
                className="remove-btn"
                onClick={() => handleRemoveFile(idx)}
              >
                ❌
              </button>
            </div>
          ))}
        </div>

        <button type="submit" className="submit-btn">
          Submit
        </button>
      </form>
    </div>
    </div>
  );
}

export default RaiseTicket;
