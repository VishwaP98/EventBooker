import React, { Component } from "react";

import './Events.css';

class EventsPage extends Component {

    render() {
        return (<div className="createEvent">
            <p className="eventsHeader">Invite others to your event</p>
            <button className="eventBtn">Create Event</button>
        </div>);
    }
}

export default EventsPage;