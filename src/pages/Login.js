import React, {useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


const navigate = useNavigate();
const handleSubmit = (e) => {
  e.preventDefault();
  axios.post('http://localhost:3001/api/login', {
    email,
    password,
  }, {
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials: true,
  })
  .then(async (response) => {
    if (response.status === 200) {
     
        navigate('/'); // Navigate to the home page
        
    }
    
  })
  .catch((err) => console.log(err));
};

    return (
        <div>
            <h1>Login</h1>
            <form>
                <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button onClick={handleSubmit}>Login</button>
            </form>
        </div>
    )
}

export default Login