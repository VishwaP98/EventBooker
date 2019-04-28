import React, { Component } from "react";

import './Events.css';
import Modal from '../Modal/Modal';
import Backdrop from '../Backdrop/Backdrop';

class EventsPage extends Component {
    state = {
        creatingEvent: false
    };

    handleCreateEvent = () => {
        this.setState({
            creatingEvent: true
        });
    }

    handleCancelEvent = () => {
        this.setState({
            creatingEvent: false
        });
    }

    handleConfirmEvent = () => {
        this.setState({
            creatingEvent: false
        });
    }

    render() {
        return (
            <React.Fragment>
                {this.state.creatingEvent && <Backdrop/>}
                {this.state.creatingEvent && <Modal title="Add Event" onCancel={this.handleCancelEvent} onConfirm={this.handleConfirmEvent}><p>Modal Content</p></Modal>}
                <div className="createEvent">
                    <p className="eventsHeader">Invite others to your event</p>
                    <button className="eventBtn" onClick={this.handleCreateEvent}>Create Event</button>
                </div>
            
            </React.Fragment>);
    }
}

export default EventsPage;