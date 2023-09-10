import React from 'react';
import {
  AppointmentForm,
} from '@devexpress/dx-react-scheduler-material-ui';

const CustomAppointmentForm = ({ appointmentData, ...restProps }) => (
  <AppointmentForm {...restProps}>
    <div>
     
      <textarea
        id="custom-notes"
        name="notes"
        value="{appointmentData.notes}"
        onChange={e => { /* Handle text changes */ }}
        placeholder="Enter custom notes here"
        style={{
          width: '100%',
          minHeight: '100px', // Adjust the height as needed
          padding: '800 px',
          border: '1px solid #ccc', // Add custom styling here
        }}
      />
    </div>
    {/* Add more fields and labels as needed */}
  </AppointmentForm>
);

export default CustomAppointmentForm;