import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';


const Home = () => {

    const currentUser = Cookies.get('currentUser');
    console.log(currentUser, ' this is the token')
    return (
        <div>
            <h1>SSS</h1>
            <h2>Welcome {currentUser}</h2>
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