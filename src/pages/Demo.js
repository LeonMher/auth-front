import * as React from 'react';
import Paper from '@mui/material/Paper';
import { ViewState, EditingState, IntegratedEditing } from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  WeekView,
  Appointments,
  AppointmentTooltip,
  AppointmentForm,
  DateNavigator,
  Toolbar,
  ViewSwitcher,
  MonthView,
  DayView,
} from '@devexpress/dx-react-scheduler-material-ui';
import { DragDropProvider } from '@devexpress/dx-react-scheduler-material-ui';

import moment from 'moment';
import axios from 'axios'

import CustomAppointmentForm from '../components/CustomAppointmentForm';

import { appointments } from './demo-data/month-appointments';

export default class Demo extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      // data: appointments,
      currentViewName: 'work-week',
    };
    this.currentViewNameChange = (currentViewName) => {
      this.setState({ currentViewName });
    };
    this.commitChanges = this.commitChanges.bind(this);
  }


  componentDidMount() {
    // Make an Axios GET request to retrieve data from the API
    axios.get('http://localhost:3001/api/schedule')
      .then((response) => {
        const retrievedData = response.data;
        // Update the component's state with the retrieved data
        this.setState({ data: retrievedData });
      })
      .catch((error) => {
        console.error('Error retrieving data:', error);
      });
  }

   currentDate = new Date();


  commitChanges({ added, changed, deleted }) {
    this.setState((state) => {
      let { data } = state;
      if (added) {

        
        const newAppointment = { ...added };
      

        
        const startDate = newAppointment.startDate // Replace with your date


        const formattedStartDate = moment(startDate);
        // const formattedStartDate = startDate.toISOString();
        
        const endDate = newAppointment.endDate // Replace with your date
        const formattedEndDate = moment(endDate);

        const formattedStartDateString = formattedStartDate.format('YYYY-MM-DD HH:mm:ss');
        const formattedEndDateString = formattedEndDate.format('YYYY-MM-DD HH:mm:ss');


        newAppointment.startDate = formattedStartDateString;
        newAppointment.endDate = formattedEndDateString;




      axios.post('http://localhost:3001/api/schedule', newAppointment)
        .then((response) => {
          console.log('New appointment added successfully:', response.data);
        })
        .catch((error) => {
          console.error('Error adding new appointment:', error);
        });

        // send sms 
      //     axios.post('http://localhost:3001/sms', {
            
      //       sms: added.title  
      //     }, {
      //       headers: {
      //         'Content-Type': 'application/json',
      //       },
      //       withCredentials: true,
      //     })
      //     .then(async (response) => {
           
      //       console.log(response, ' sms');
      //     })
      //     .catch((err) => console.log(err));
        
      
      data = [...data, newAppointment];
      }



      if (changed) {
        data = data.map(appointment => (
          changed[appointment.id] ? { ...appointment, ...changed[appointment.id] } : appointment));
      }
      if (deleted !== undefined) {
        data = data.filter(appointment => appointment.id !== deleted);
      }
      return { data };
    });
  }
   appointmentFormTemplate = ({ appointmentData, onFieldChange }) => (
    <AppointmentForm.OverlayLayout>
      {/* Customize the form here */}
      <div style={{ padding: '20px' }}>
        <label>Title:</label>
        <input
          type="text"
          value={appointmentData.title}
          onChange={(e) => onFieldChange({ title: e.target.value })}
        />
      </div>
      <div style={{ padding: '20px' }}>
        <label>Notes:</label>
        <textarea
          value={appointmentData.notes}
          onChange={(e) => onFieldChange({ notes: e.target.value })}
        />
      </div>
      {/* Add more custom fields or styling as needed */}
    </AppointmentForm.OverlayLayout>
  );

  render() {
    const { data, currentViewName } = this.state;

    return (
      <Paper>
        <Scheduler
          data={data}
          height={660}
        >
          <ViewState
            defaultCurrentDate={this.currentDate}
            currentViewName={currentViewName}
            onCurrentViewNameChange={this.currentViewNameChange}
          />
            <EditingState
            onCommitChanges={this.commitChanges}
          />
          <IntegratedEditing />

          
          <WeekView
            name="work-week"
            displayName="Work Week"
           
          />
          
          <MonthView />
          <DayView />

          <Toolbar />
          <DateNavigator />
          <ViewSwitcher />
          <Appointments />
          <AppointmentTooltip
            showCloseButton
            showOpenButton
          />
           <CustomAppointmentForm />
           <DragDropProvider
  
  
/>
        </Scheduler>
      </Paper>
    );
  }
}
