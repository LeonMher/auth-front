import React, {useState, useEffect} from 'react';
import axios from 'axios';

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


   

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3000/signup', {
            email,
            password
        })
        .then(()=>console.log('worked'))
        .catch((err)=>console.log(err))
    }
    return (
        <div>
            <h1>Signup</h1>
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
                <button onClick={handleSubmit}>Submit</button>
            </form>
        </div>
    )
}

export default Signup