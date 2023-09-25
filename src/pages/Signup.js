import React, {useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const [username, setUserName] = useState('');
    const [role, setRole] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


   
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3001/api/signup', {
          username, 
          role,
          email,
          password,
        }, {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        })
          .then(async (response) => {
            navigate('/');
            console.log(response, ' desired token');
          })
          .catch((err) => console.log(err));
      };
    return (
        <div>
            <h1>Signup</h1>
            <form>
            <input
                    type="text"
                    value={username}
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder='username'
                />
                <input
                    type="text"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    placeholder='role'
                />
                <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder='email'
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder='password'
                />
                <button onClick={handleSubmit}>Submit</button>
            </form>
        </div>
    )
}

export default Signup