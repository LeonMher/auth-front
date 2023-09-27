import React, { useState } from 'react';
import axios from 'axios'
import { TextField, Button } from '@mui/material';
import {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFns';
import {LocalizationProvider, TimePicker, DateTimePicker, DatePicker,} from '@mui/x-date-pickers';


const CustomModal = ({ isOpen, onClose, onSubmit, selectedStartDate, selectedEndDate, userName, userId }) => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [title, setTitle] = useState('');
  const [notes, setNotes] = useState('');

  const [startDateTime, setStartDateTime] = useState(null);  
  const [endDateTime, setEndDateTime] = useState(null);  
 

  const handleSubmit = ({date}) => {
    // Add any necessary validation here before submitting the dates
    onSubmit(startDate, endDate);
    onClose(); // Close the modal after submitting


    axios.post(`http://localhost:3001/api/request/${userId}`, {
        userName: userName,
        title: title,
        allDay: true,
        notes: notes,
        start: selectedStartDate,
        end: selectedEndDate,
        employee_id: 2
    })
        .then((response) => {
          console.log('New appointment request added successfully:', response.data);
        })
        .catch((error) => {
          console.error('Error adding new appointment:', error);
        });


  };

  
  return (
    <div  className={`modal ${isOpen ? 'open' : ''}`}>
      <div style={{display: "flex", justifyContent: 'center', alignItems: 'center', flexDirection:'column'}} className="modal-content">
      
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        
        <DateTimePicker
          label="Start Time"
          renderInput={(params)=> <TextField {...params} />}
          value={selectedStartDate ? selectedStartDate : startDateTime}
          onChange={(newValue)=>{
            setStartDateTime(newValue)
          }}
        />
        <DateTimePicker
          label="End Time"
          renderInput={(params)=> <TextField {...params} />}
          value={selectedEndDate ? selectedEndDate : endDateTime}
          onChange={(newValue)=>{
            setEndDateTime(newValue)
          }}
        />
      </LocalizationProvider>
        <TextField
          type="text"
          label="End Date"
          variant="standard"
          value={selectedEndDate ? selectedEndDate : endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />

        <TextField 
        type="text" 
        label="Title"
        variant="standard" 
        value={title} 
        onChange={(e)=>setTitle(e.target.value)}
        />

        <TextField 
        type="text" 
        variant='standard' 
        label="Notes" 
        value={notes}
        onChange={(e)=>setNotes(e.target.value)} 
        />
        
        <Button variant='contained' onClick={handleSubmit}>Submit</Button>
        <Button variant='outlined' onClick={onClose}>Cancel</Button>
      </div>
    </div>
  );
};

export default CustomModal;
