import React from 'react'
import { formatDate } from '@fullcalendar/core'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { INITIAL_EVENTS } from './event-utils'
import CustomModal from './CustomModal'
import axios from 'axios'

export default class DemoApp extends React.Component {

  state = {
    dates: '',
    isModalOpen: false,
    selectedStartDate: '',
    selectedEndDate: '',
    weekendsVisible: true,
    currentEvents: []
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

    
console.log('asd')  }

  handleDateSelect = (selectInfo) => {
    // Open the modal and save the selected start date
    this.setState({
      
      isModalOpen: true,
      selectedStartDate: selectInfo.startStr,
      selectedEndDate: selectInfo.endStr,
    });
  };

  handleCloseModal = () => {
    // Close the modal
    this.setState({
      isModalOpen: false,
    });
  };

  handleSubmitModal = (startDate, endDate) => {
    // Handle the selected dates (e.g., save them or perform actions)
    console.log('Selected Start Date:', startDate);
    console.log('Selected End Date:', endDate);
    // Close the modal
    this.handleCloseModal();
  };

  render() {
    return (
      <div className='demo-app'>
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
            eventClick={this.handleEventClick}
            eventsSet={this.handleEvents} // called after events are initialized/added/changed/removed
            /* you can update a remote database when these fire:
            eventAdd={function(){}}
            eventChange={function(){}}
            eventRemove={function(){}}
            */
          />
        {this.state.isModalOpen && <CustomModal
          isOpen={this.state.isModalOpen}
          onClose={this.handleCloseModal}
          onSubmit={this.handleSubmitModal}
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

  handleEventClick = (clickInfo) => {
    if (alert(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
      clickInfo.event.remove()
    }
  }

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
