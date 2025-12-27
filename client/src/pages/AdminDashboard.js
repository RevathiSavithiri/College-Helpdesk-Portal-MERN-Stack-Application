import React, { useState } from "react";
import axios from "axios";
import "./AdminDashboard.css";
import TicketCard from "../components/TicketCard";

function AdminDashboard({ tickets = [], updateTicketStatus}) {
  
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("newest");
  const [localTickets, setLocalTickets] = useState(tickets);



  const filteredTickets = localTickets.filter( (t) => {
    
    const readableId = t.ticketId || "";
    const name = t.student?.name || "";
    const subject = t.subject || "";

    return (
      readableId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      subject.toLowerCase().includes(searchTerm.toLowerCase())
    );

  });

 
  const sortedTickets = [...filteredTickets].sort((a, b) => {
    const getDateTimeFromId = (id) => {
      const parts = id.split("-");
      if (parts.length >= 3) {
        const dateStr = parts[1]; // e.g. "16102025"
        const timeStr = parts[2]; // e.g. "135730"

        const day = parseInt(dateStr.slice(0, 2));
        const month = parseInt(dateStr.slice(2, 4)) - 1;
        const year = parseInt(dateStr.slice(4, 8));
        const hours = parseInt(timeStr.slice(0, 2));
        const minutes = parseInt(timeStr.slice(2, 4));
        const seconds = parseInt(timeStr.slice(4, 6));

        return new Date(year, month, day, hours, minutes, seconds);
      }
      return new Date(0);
    };

    const dateA = getDateTimeFromId(a.ticketId);
    const dateB = getDateTimeFromId(b.ticketId);
    return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
  });


  const removeTicket = async (id) => {
  try {
    const token = localStorage.getItem("token");

    await axios.delete(`http://localhost:5000/api/admin/ticket/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    
    const updated = localTickets.filter((t) => t._id !== id);
    setLocalTickets(updated);   

  } catch (error) {
    console.error("Delete failed:", error);

    if (error.response?.status === 401) {
      alert("Session expired. Please login again.");
      window.location.href = "/login";
    }
  }
};

const handleStatusUpdate = async (id, newStatus) => {
  try {
    const token = localStorage.getItem("token");
   
    await axios.put(
      `http://localhost:5000/api/admin/ticket/status/${id}`,
      { status: newStatus },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    const updated = localTickets.map((t) =>
      t._id === id ? { ...t, status: newStatus } : t
    );

    setLocalTickets(updated);

  } catch (error) {
    console.error("Status update failed:", error);
  }
};


  return (
    <div className="page-container admin-page">
      <h2>Admin Dashboard</h2>

      <div className="controls">
        <input
          type="text"
          placeholder="Search by ID, Name and Subject"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
        </select>
      </div>


      {sortedTickets.length === 0 ? (
        <p>No tickets available.</p>
      ) : (
        <div className="tickets-grid">
          {sortedTickets.map((t) => (
            <TicketCard
              key={t._id}
              ticket={t}
              showStatusDropdown={true}
              updateTicketStatus={handleStatusUpdate}
              showEmailButton={true}
              removeTicket={removeTicket}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;
