import React, { Component } from 'react';
import Gantt from './components/Gantt';
import Toolbar from './components/Toolbar';
import MessageArea from './components/MessageArea';
import axios from 'axios'


class Main extends Component {
  state = {
    currentZoom: 'Days',
    messages: [],
    data: {
      data: [],
    }
  };


  componentDidMount() {
    axios.get('http://localhost:3001/api/gantt')
      .then((response) => {
        const retrievedData = response.data;
        this.setState({ data:  {data: retrievedData} });  
      })
      .catch((error) => {
        console.error('Error retrieving data:', error);
      });
  }

  addMessage(message) {
    const maxLogLength = 5;
    const newMessage = { message };
    const messages = [
      newMessage,
      ...this.state.messages
    ];

    if (messages.length > maxLogLength) {
      messages.length = maxLogLength;
    }
    this.setState({ messages });
  }

  logDataUpdate = (type, action, item, id) => {
    let text = item && item.text ? ` (${item.text})` : '';
    let message = `${type} ${action}: ${id} ${text}`;
    if (type === 'link' && action !== 'delete') {
      message += ` ( source: ${item.source}, target: ${item.target} )`;
    }
    this.addMessage(message);
  }

  handleZoomChange = (zoom) => {
    this.setState({
      currentZoom: zoom
    });
  }
  render() {
    const { currentZoom, messages, data } = this.state;
    const ganttComponent = data.data.length > 0 ? (
        <Gantt
          tasks={data}
          zoom={currentZoom}
          onDataUpdated={this.logDataUpdate}
        />
      ) : null;
    return (
      <div>
        <div className="zoom-bar">
          <Toolbar
            zoom={currentZoom}
            onZoomChange={this.handleZoomChange}
          />
        </div>
        <div className="gantt-container">
          {ganttComponent}
        </div>
        <MessageArea
          messages={messages}
        />
      </div>
    );
  }
}

export default Main;

