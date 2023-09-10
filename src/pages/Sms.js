import React, {useState, useEffect} from 'react';
import axios from 'axios';


const Sms = () => {
   
    const [sms, setSms] = useState('');


const handleSubmit = (e) => {
  e.preventDefault();
  axios.post('http://localhost:3001/sms', {
    
    sms,
  }, {
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials: true,
  })
  .then(async (response) => {
   
    console.log(response, ' sms');
  })
  .catch((err) => console.log(err));
};
    return (
        <div>
            <h1>SMS</h1>
            <form>
                <input
                    type="text"
                    value={sms}
                    onChange={(e) => setSms(e.target.value)}
                />
               
                <button onClick={handleSubmit}>Send SMS</button>
            </form>
        </div>
    )
}

export default Sms