import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import TicketCard from "../components/TicketCard";
import "./MyTickets.css";

function MyTickets() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/tickets/my-tickets", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        const data = await response.json();
        setTickets(data);
      } catch (error) {
        console.error("Error fetching tickets:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="page-container student-page">
      <h2>My Tickets</h2>

      {tickets.length === 0 ? (
        <>
          <p>No tickets raised yet.</p>
          <Link to="/raise-ticket">
            <button className="raise-btn">Raise your first ticket</button>
          </Link>
        </>
      ) : (
        <ul className="tickets-grid two-col">
          {tickets.map((t) => (
            <TicketCard
              key={t._id}   
              ticket={t}
              showStatusDropdown={false}
              showEmailButton={false}
            />
          ))}
        </ul>
      )}
    </div>
  );
}

export default MyTickets;
