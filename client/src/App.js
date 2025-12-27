import React,{useState, useEffect} from 'react';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import { NotificationProvider } from "./context/NotificationContext";

import TextEditorTest from "./pages/TextEditorTest";
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Home from "./pages/Home";
import RaiseTicket from "./pages/RaiseTicket";
import MyTickets from "./pages/MyTickets";
import AdminDashboard from "./pages/AdminDashboard";
import AdminAddStudent from "./pages/AdminAddStudent"; 

function App() {

     const [user, setUser] = useState(null);
     const [tickets, setTickets] = useState([]);
    
     useEffect(() => {
       fetch("http://localhost:5000/api/tickets")
        .then(res => res.json())
        .then(data => setTickets(data))
        .catch(err => console.error("Error loading tickets", err));
     }, []);


      const addTicket = async (ticketData) => {

       try {
          const token = localStorage.getItem("token");

          const res = await fetch("http://localhost:5000/api/tickets", {
          method: "POST",
          headers: {  "Authorization": `Bearer ${token}` },
          body: ticketData   
        });

         const newTicket = await res.json();
        setTickets(prev => [...prev, newTicket]);

       } catch (error) {
          console.error("Error creating ticket:", error);
       }
     };


     const updateTicketStatus = async (id, newStatus) => {
       try {
         const res = await fetch(`http://localhost:5000/api/tickets/${id}`, {
           method: "PUT",
           headers: { "Content-Type": "application/json" },
           body: JSON.stringify({ status: newStatus })
       });

          const updated = await res.json();

          setTickets(prev =>
             prev.map(t => (t._id === id ? updated : t))
          );

        } catch (error) {
           console.error("Error updating ticket", error);
        }
      };

  return (
   <NotificationProvider>
    <Router>
      {user && <Navbar user={user} setUser={setUser} />}
      <Routes>
        <Route path='/login' element={<Login setUser={setUser} />} />
        <Route path="/editor-test" element={<TextEditorTest />} />
        
        <Route path='/home' element={user?.role === "student" ?(
             <div className="page-content"> <Home /> </div> ) : <Login setUser={setUser}/>} />
        <Route path='/raise-ticket' element={user?.role === "student" ? <RaiseTicket addTicket={addTicket} user={user}/> : <Login setUser={setUser} />} />
        <Route path='/my-tickets' element={user?.role === "student" ? <MyTickets tickets={tickets.filter(t => t.student === user._id)} />
                 : <Login setUser={setUser} /> } />


        <Route path="/admin" element={user?.role === "admin" ? <AdminDashboard tickets={tickets} updateTicketStatus={updateTicketStatus}/> : <Login setUser={setUser} />} />
        <Route path="/admin/add-student" element={user?.role === "admin" ? <AdminAddStudent /> : <Login setUser={setUser} />} />
        
       
        <Route path="*" element={<Login setUser={setUser} />} />
      </Routes>
    </Router>
  </NotificationProvider>  
  );
}

export default App;



