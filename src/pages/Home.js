import React from 'react';
import { Link } from 'react-router-dom';


const Home = () => {
    return (
        <div>
            <h1>SSS</h1>
            <Link to="/dashboard">Dashboard</Link>
            <br/>
            <Link to="/aboutus">About us</Link>
          
        </div>
    )
}

export default Home;