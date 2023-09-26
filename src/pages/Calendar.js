import React from 'react'
import { formatDate } from '@fullcalendar/core'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { INITIAL_EVENTS } from './event-utils'
import CustomModal from './CustomModal'
import CustomUpdateModal from './CustomUpdateModal'
import axios from 'axios'
import moment from 'moment';


//mui stuff

import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';



export default class DemoApp extends React.Component {

  state = {
    dates: '',
    isUpdateModalOpen: false,
    isModalOpen: false,
    selectedStartDate: '',
    selectedEndDate: '',
    weekendsVisible: true,
    currentEvents: [],
    left: false
  }

  componentDidMount() {
    // Make an Axios GET request to retrieve data from the API
    axios.get(`http://localhost:3001/api/schedule/${this.props.userId}`)
      .then((response) => {
        console.log(response, ' Do i see this in calendar view?')
        const retrievedData = response.data;
        // Update the component's state with the retrieved data
        this.setState({ currentEvents: retrievedData });  
      })
      .catch((error) => {
        console.error('Error retrieving data:', error);
      });

      //check the requested shifts
    axios.get(`http://localhost:3001/api/requestshifts`)
      .then((response) => {
        const requestedShifts = response.data;
        // Update the component's state with the retrieved data
        this.setState({ requestedShiftData: requestedShifts });  
      })
      .catch((error) => {
        console.error('Error retrieving data:', error);
      });

  }

  handleSubmitData = (selectInfo) =>{
    // axios.post(`http://localhost:3001/api/schedule/2`, {
    //     userName: "New Person",
    //     title: "something",
    //     allDay: true,
    //     notes: 'some notes',
    //     start: selectInfo.startStr,
    //     end: selectInfo.endStr,
    //     employee_id: 2
    // })
    //     .then((response) => {
    //       console.log('New appointment added successfully:', response.data);
    //     })
    //     .catch((error) => {
    //       console.error('Error adding new appointment:', error);
    //     });

    
  }

  handleDateSelect = (selectInfo) => {
    // Open the modal and save the selected start date
    this.setState({
      
      isModalOpen: true,
      selectedStartDate: selectInfo.startStr,
      selectedEndDate: selectInfo.endStr,
      left: true
      
    });

  };


  handleEventChange = (selectInfo) => {
    // Open the modal and save the selected start date
    console.log(selectInfo.event.id, 'updating')
    this.setState({
      
      isUpdateModalOpen: true,
      selectedStartDate: selectInfo.startStr,
      selectedEndDate: selectInfo.endStr,
    });

        const formattedStartDate = moment(selectInfo.event.start);
        const formattedEndDate = moment(selectInfo.event.end);
        
        const formattedStartDateString = formattedStartDate.format('YYYY-MM-DD HH:mm:ss');
        const formattedEndDateString = formattedEndDate.format('YYYY-MM-DD HH:mm:ss');

    axios.put(`http://localhost:3001/api/request/${selectInfo.event.id}`, {
        id: selectInfo.event.id,
        userName: this.props.userName,
        title: "title",
        allDay: true,
        notes: "notes",
        start: formattedStartDateString,
        end: formattedEndDateString,
        employee_id: 2
    })
        .then((response) => {
          console.log('New appointment updated successfully:', response.data);
        })
        .catch((error) => {
          console.error('Error updating new appointment:', error);
        });


  };

  handleCloseModal = () => {
    // Close the modal
    this.setState({
      isModalOpen: false,
    });
  };

  handleSubmitModal = (startDate, endDate) => {
    
    // Close the modal
    this.handleCloseModal();
  };


  handleEventClick = (eventInfo) => {
    // Prepare the data to be sent in the PUT request
    const updatedEvent = {
      title: eventInfo.event.title,
      notes: eventInfo.event.notes,
      start: eventInfo.event.startStr,
      end: eventInfo.event.endStr,
      // Add other event properties you want to update
        // Open the modal and save the selected start date        
    };

    console.log(eventInfo.event, ' event info')
    this.setState({
        isModalOpen: true,
        selectedStartDate: updatedEvent.start,
        selectedEndDate: updatedEvent.end,
      });
  
    // Send a PUT request to update the event on the server
    // axios.put(`http://localhost:3001/api/request/${eventInfo.event.id}`, updatedEvent)
    //   .then((response) => {
    //     console.log('Event updated successfully:', response.data);
    //   })
    //   .catch((error) => {
    //     console.error('Error updating event:', error);
    //   });
  };

  render() {

    const toggleDrawer = (anchor, open) => (event) => {
      if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
        return;
      }
      
      this.setState({ ...this.state, [anchor]: open });
     
    };
  
    const list = (anchor) => (
      
      <Box
        sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
        role="presentation"
        onClick={toggleDrawer(anchor, false)}
        onKeyDown={toggleDrawer(anchor, false)}
        
      >
        {console.log(this.state.selectedStartDate, ' start date info')}
        <CustomModal
          isOpen={this.state.isModalOpen}
          onClose={this.handleCloseModal}
          onSubmit={this.handleSubmitModal}
          selectedStartDate={this.state.selectedStartDate}
          selectedEndDate={this.state.selectedEndDate}
          userName={this.props.userName}

        />
      </Box>
    );


    return (
      <div className='demo-app'>

   
    <Button onClick={toggleDrawer('left', true)}>Open</Button>
          <Drawer
            anchor={'left'}
            open={this.state['left']}
            onClose={toggleDrawer('left', false)}
          >
            {list('anchor')}
          </Drawer>
        {this.renderSidebar()}
        <div className='demo-app-main'>
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            headerToolbar={{
              left: 'prev,next today',
              center: 'title',
              right: 'dayGridMonth,timeGridWeek,timeGridDay'
            }}
            initialView='dayGridMonth'
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            weekends={this.state.weekendsVisible}
            initialEvents={INITIAL_EVENTS} // alternatively, use the `events` setting to fetch from a feed
            select={this.handleDateSelect}
            events={this.state.currentEvents}
            eventContent={renderEventContent} // custom render function
            //to change an event
            eventClick={this.handleEventClick}
            eventsSet={this.handleEvents} // called after events are initialized/added/changed/removed
            eventChange={this.handleEventChange}
            /* you can update a remote database when these fire:
            eventAdd={function(){}}
            eventRemove={function(){}}
            */
          />
        {/* {this.state.isModalOpen && <CustomModal
          isOpen={this.state.isModalOpen}
          onClose={this.handleCloseModal}
          onSubmit={this.handleSubmitModal}
          selectedStartDate={this.state.selectedStartDate}
          selectedEndDate={this.state.selectedEndDate}
          userName={this.props.userName}

        /> } */}
        {this.state.isUpdateModalOpen && <CustomUpdateModal
          isOpen={this.state.isUpdateModalOpen}
          onClose={this.handleUpdateCustomCloseModal}
          onSubmit={this.handleUpdateSubmitModal}
          selectedStartDate={this.state.selectedStartDate}
          selectedEndDate={this.state.selectedEndDate}
          userName={this.props.userName}

        /> }

        </div>
      </div>
    )
  }

  renderSidebar() {
    return (
      <div className='demo-app-sidebar'>
        <div className='demo-app-sidebar-section'>
          <h2>Instructions</h2>
          <ul>
            <li>Select dates and you will be prompted to create a new event</li>
            <li>Drag, drop, and resize events</li>
            <li>Click an event to delete it</li>
          </ul>
        </div>
        <div className='demo-app-sidebar-section'>
          <label>
            <input
              type='checkbox'
              checked={this.state.weekendsVisible}
              onChange={this.handleWeekendsToggle}
            ></input>
            toggle weekends
          </label>
        </div>
        <div className='demo-app-sidebar-section'>
          <h2>All Events ({this.state.currentEvents.length})</h2>
          <ul>
            {this.state.currentEvents.map(renderSidebarEvent)}
          </ul>
        </div>
      </div>
    )
  }

  handleWeekendsToggle = () => {
    this.setState({
      weekendsVisible: !this.state.weekendsVisible
    })
  }

//   handleDateSelect = (selectInfo) => {
//     let title = prompt('Please enter a new title for your event')
//     let calendarApi = selectInfo.view.calendar

//     calendarApi.unselect() // clear date selection

//     if (title) {
//         this.handleSubmitData()
//       calendarApi.addEvent({
//         id: createEventId(),
//         title,
//         someOtherInfo: "Some other info",
//         start: selectInfo.startStr,
//         end: selectInfo.endStr,
//         allDay: selectInfo.allDay
//       })
//     }
//   }

//   handleEventClick = (clickInfo) => {
//     if (alert(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
//       clickInfo.event.remove()
//     }
//   }

//   handleEvents = (events) => {
//     console.log('something happened ', events)
//     this.setState({
//       currentEvents: events
//     })
//   }

}

function renderEventContent(eventInfo) {
  return (
    <>
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
    </>
  )
}

function renderSidebarEvent(event) {
  return (
    <li key={event.id}>
      <b>{formatDate(event.start, {year: 'numeric', month: 'short', day: 'numeric'})}</b>
      <i>{event.title}</i>
    </li>
  )
}
