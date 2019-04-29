import React, { Component } from "react";

import './Events.css';
import Modal from '../Modal/Modal';
import Backdrop from '../Backdrop/Backdrop';

class EventsPage extends Component {
    state = {
        creatingEvent: false
    };

    constructor(props) {
        super(props);
        this.titleElement = React.createRef();
        this.priceElement = React.createRef();
        this.dateElement = React.createRef();
        this.descriptionElement = React.createRef();

    }

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

        const title = this.titleElement.current.value;
        const price = +this.priceElement.current.value; // + converts it to a number
        const date = this.dateElement.current.value;
        const description = this.descriptionElement.current.value;

        if(title.trim().length === 0 || price.trim().length === 0
            || date.trim().length === 0 || description.trim().length === 0) {
                return;
        }

        const event = {title: title, price: price, date: date, description: description};
        console.log(event);

    }

    render() {
        return (
            <React.Fragment>
                {this.state.creatingEvent && <Backdrop/>}
                {this.state.creatingEvent && 
                    <Modal title="Add Event" onCancel={this.handleCancelEvent} onConfirm={this.handleConfirmEvent}>
                        <form>

                            <div className="form-control">
                                <label htmlFor="title">Title</label>
                                <input type="text" id="title" ref={this.titleElement}/>
                            </div>

                            <div className="form-control">
                                <label htmlFor="price">Price</label>
                                <input type="number" id="price" ref={this.priceElement}/>
                            </div>

                            <div className="form-control">
                                <label htmlFor="date">Date</label>
                                <input type="datetime-local" id="date" ref={this.dateElement}/>
                            </div>

                            <div className="form-control">
                                <label htmlFor="description">Description</label>
                                <textarea id="description" rows="4" ref={this.descriptionElement}/>
                            </div>

                        </form>
                    </Modal>
                }
                <div className="createEvent">
                    <p className="eventsHeader">Invite others to your event</p>
                    <button className="eventBtn" onClick={this.handleCreateEvent}>Create Event</button>
                </div>
            
            </React.Fragment>);
    }
}

export default EventsPage;