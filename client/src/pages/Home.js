import React from 'react';
import {Link} from "react-router-dom";
import './Home.css';
import helpdeskImg from './Help-desk.png';

function Home() {
    return(
        <div className='home-page' >

            <img src={helpdeskImg} alt="Help Desk" className="helpdesk-img" />

            <h1>Welcome to RP College Helpdesk Portal</h1>
            <p>Raise and track your college-related queries easily.</p>
            <nav>
                <Link to="/raise-ticket">Raise Ticket</Link>||{" "}
                <Link to='/my-tickets'>My Tickets</Link>
            </nav>
         </div> 
          
            
    );
}

export default Home;
