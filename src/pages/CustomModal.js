import React, { useState } from 'react';
import axios from 'axios'

const CustomModal = ({ isOpen, onClose, onSubmit, selectedStartDate, selectedEndDate, userName }) => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [title, setTitle] = useState('');
  const [notes, setNotes] = useState('');


  const handleSubmit = ({date}) => {
    // Add any necessary validation here before submitting the dates
    onSubmit(startDate, endDate);
    onClose(); // Close the modal after submitting


    axios.post(`http://localhost:3001/api/schedule/2`, {
        userName: userName,
        title: title,
        allDay: true,
        notes: notes,
        start: selectedStartDate,
        end: selectedEndDate,
        employee_id: 2
    })
        .then((response) => {
          console.log('New appointment added successfully:', response.data);
        })
        .catch((error) => {
          console.error('Error adding new appointment:', error);
        });


  };

  console.log(selectedStartDate, ' selected start date?')
  console.log(selectedEndDate, ' selected end date?')
  return (
    <div className={`modal ${isOpen ? 'open' : ''}`}>
      <div className="modal-content">
        <h2>Select Dates</h2>
        <label>Start Date:</label>
        <input
          type="text"
          value={selectedStartDate ? selectedStartDate : startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <label>End Date:</label>
        <input
          type="text"
          value={selectedEndDate ? selectedEndDate : endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />

        <input type="text" value={title} placeholder='Title' onChange={(e)=>setTitle(e.target.value)}/>
        <input type="text" value={notes} placeholder="Notes" onChange={(e)=>setNotes(e.target.value)} />
        
        <button onClick={handleSubmit}>Submit</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default CustomModal;
