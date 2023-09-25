import React from 'react';
import { Link } from 'react-router-dom';


const Home = () => {

    return (
        <div>
            <h1>SSS</h1>
            <h2>Welcome Bro</h2>
            <Link to="/dashboard">Dashboard</Link>
            <br/>
            <Link to="/aboutus">About us</Link>
            <br/>
            <Link to="/sms">Message</Link>
            <br/>
            <Link to="/demo">Demo</Link>
            <br/>
            <Link to="/gantt">Schedule</Link>
            <br />
            <Link to="/cal">Calendar</Link>

          
        </div>
    )
}

export default Home;