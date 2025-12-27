import React, { useState } from "react";
import { useNotification } from "../context/NotificationContext";
import "./AdminAddStudent.css";

function AdminAddStudent() {
  const { showNotification } = useNotification();
  const [formData, setFormData] = useState({
    name: "",
    rollNumber: "",
    email: "",
    dob: "",
  });
  

  const [showModal, setShowModal] = useState(false);
  const [generatedPassword, setGeneratedPassword] = useState("");
  const [studentName, setStudentName] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token"); 
      const response = await fetch("http://localhost:5000/api/admin/add-student", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        showNotification(data.message,"success");
        setStudentName(data.student?.name || "N/A");
        setGeneratedPassword(data.password || "Not Provided");
        setShowModal(true); 
        
        setFormData({ name: "", rollNumber: "", email: "", dob: "" }); 
      } else {
        showNotification(data.message || "Failed to add student","error");
      }
    } catch (error) {
      console.error("Error:", error);
      showNotification("Something went wrong","error");
    }
  };

  return (
    <div className="admin-add-container">
      <h2>Add Student</h2>
      <form onSubmit={handleSubmit}>
        <label>Name :</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <label>Roll Number :</label>
        <input
          type="text"
          name="rollNumber"
          value={formData.rollNumber}
          onChange={handleChange}
          required
        />

        <label>Email :</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <label>DOB :</label>
        <input className="dob"
          type="date"
          name="dob"
          value={formData.dob}
          onChange={handleChange}
          required
        />

        <button type="submit" className="admin-add-btn">Add Student</button>
      </form>

    
      {showModal && (
        <div className="admin-modal-overlay" onClick={() => setShowModal(false)}>
          <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
             
             <button className="admin-close-btn" onClick={() => setShowModal(false)} 
                     aria-label="Close">❌</button>  
             
             <h3 style={{textAlign: "center",marginBottom: "15px",color: "green"}}>Student Added Successfully🎉</h3>

             <p style={{ textAlign: "center" }}><strong>Name:</strong>{" "}
               <span style={{ fontWeight: "bold", color: "#1a1a1a" }}>
                    {studentName}
               </span>
             </p>
             
             <p style={{ textAlign: "center", marginTop:"10px" }}><strong> Password:</strong>{" "}
               <span style={{ fontWeight: "bold", color: "darkblue" ,  marginRight: "8px" }}>
                  {generatedPassword}
               </span>
             
               <button className="admin-copy-btn"  style={{ background: "none", border: "none",
                                  cursor: "pointer",fontSize: "16px",}}
                 onClick={() => { navigator.clipboard.writeText(generatedPassword);
                 showNotification("Password copied to clipboard!","success"); }}>⿻</button>
             </p>
           
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminAddStudent;
