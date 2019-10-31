import React, { Component } from "react";
import {Calendar, momentLocalizer,} from 'react-big-calendar';
import moment from "moment";

import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment)
  
class Appointments extends Component {
constructor(props) {
super(props); 
  this.state = {
    events: [
      {  start: new Date(),
         end: new Date(moment().add(60, "minutes")), 
         title: "Some title"}],
    test: '1572340272793',
    
    };
    const minTime = new Date();
    minTime.setHours(8,30,0);
    const maxTime = new Date();
    maxTime.setHours(20,30,0);
  
  };
    
    
    componentDidMount() {
        fetch('https://customerrest.herokuapp.com/gettrainings')
          .then(data => data.json())
          .then(data => this.setState({
            events: data.map(appointment => ({
            start: moment.utc(appointment.date).toDate(),
            end: moment(appointment.date + (appointment.duration * 60000)).toDate(),
            title: appointment.activity + " - " + appointment.customer.firstname + " " + appointment.customer.lastname,
            })) }))
            console.log(this.state.events); 
      };




      
  render() {
    return (
      <div className="App">
        <Calendar
          localizer={localizer}
          defaultView="month"
          events={this.state.events}
          style={{ height: "100vh" }}
          startAccessor="start"
          endAccessor="end"
          min={new Date(2019, 10, 0, 10, 0, 0)}
          max={new Date(2019, 10, 0, 22, 0, 0)}
        />
      </div>
    );
  }
}

export default Appointments;