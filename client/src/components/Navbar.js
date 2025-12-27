import React from 'react';
import {Link} from "react-router-dom";
import "./Navbar.css";

function Navbar({user , setUser}) {
    return(
        <nav className='navbar'>
            <h2 className='logo'><strong>🎓</strong> College Helpdesk</h2>
            
            <ul className='nav-links'>
            {user?.role === "student" && (
                <>
                <li><Link to='/home' >Home</Link></li>
                <li><Link to='/raise-ticket'>Raise Ticket</Link></li>
                <li><Link to='/my-tickets'>My Tickets</Link></li>
                </>
            )}          
            
            {user?.role === "admin" && (
                   <>
                   <li><Link to='/admin'>Dashboard</Link></li>
                   <li><Link to='/admin/add-student'>Add Student</Link></li>
                   </>
            )}

           <li>
            {user ? (
                 <button className='logout' onClick={() => setUser(null)}>Logout</button>
                ) : (
                 <Link to="/login">Login</Link>
            )}
           </li>
         </ul>
        </nav>
    );
}

export default Navbar;