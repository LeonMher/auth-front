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
import Cookies from 'js-cookie';

import moment from 'moment';
import axios from 'axios'
import {createTheme, ThemeProvider } from '@mui/material/styles';
import CustomAppointmentForm from '../components/CustomAppointmentForm';

import { appointments } from './demo-data/month-appointments';

export default class Demo extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      
      data: [],
      dataChanged: false,
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


  componentDidUpdate() {
    if (this.state.dataChanged) {
      axios
        .get('http://localhost:3001/api/schedule')
        .then((response) => {
          const retrievedData = response.data;
          this.setState({ data: retrievedData, dataChanged: false });
        })
        .catch((error) => {
          console.error('Error retrieving updated data:', error);
        });
    }
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
        for (let appointmentId in changed) {
          const updatedAppointment = {
            ...data.find((appointment) => appointment.id === appointmentId),
            ...changed[appointmentId],
          };
  
          // Convert dates to the desired format if necessary
          updatedAppointment.startDate = moment(updatedAppointment.startDate).format('YYYY-MM-DD HH:mm:ss');
          updatedAppointment.endDate = moment(updatedAppointment.endDate).format('YYYY-MM-DD HH:mm:ss');
  
          axios.put(`http://localhost:3001/api/update-schedule/${appointmentId}`, updatedAppointment)
            .then((response) => {
              console.log('Appointment updated successfully:', response.data);
            })
            .catch((error) => {
              console.error('Error updating appointment:', error);
            });
  
          data = data.map((appointment) =>
            appointment.id === appointmentId ? updatedAppointment : appointment
          );
        }

        this.setState({ dataChanged: true });
      }
      if (deleted !== undefined) {
        const deletedAppointmentId = deleted;

        // Send a DELETE request to delete the appointment
        axios
          .delete(`http://localhost:3001/api/delete-schedule/${deletedAppointmentId}`)
          .then((response) => {
            if (response.status === 200) {
              console.log('Appointment deleted successfully:', response.data);

              // Update the data in your state after successful deletion
              data = data.filter((appointment) => appointment.id !== deleted);
              this.setState({ data });
            } else if (response.status === 404) {
              console.error('Appointment not found:', response.data);
            }
          })
          .catch((error) => {
            console.error('Error deleting appointment:', error);
          });
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
    const currentUserRole = Cookies.get('currentUserRole');
      const darkTheme = createTheme({
      components: {
        // Name of the component
        MuiButton: {
          styleOverrides: {
            // Name of the slot
            root: {
              backgroundColor: 'black ', // Custom background color
              // fontSize: '1.5rem', // Custom font size
              color: 'white',
              fontSize: '1rem',
            },
          },
        },
  
        MuiPaper: {
          styleOverrides: {
            root: {
              backgroundColor: currentUserRole === 'employee' ? 'black': 'white',
              color:'white',
              boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
            },
          },
        }
      },
    });

    return (
      <ThemeProvider theme={darkTheme}>
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
      </ThemeProvider>
    );
  }
}
