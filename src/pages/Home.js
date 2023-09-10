import React from 'react';
import { Link } from 'react-router-dom';


const Home = () => {
    return (
        <div>
            <h1>SSS</h1>
            <Link to="/dashboard">Dashboard</Link>
            <br/>
            <Link to="/aboutus">About us</Link>
            <br/>
            <Link to="/sms">Message</Link>
            <br/>
            <Link to="/demo">Demo</Link>
          
        </div>
    )
}

export default Home;