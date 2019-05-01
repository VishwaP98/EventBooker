import React, { Component } from "react";

import './Events.css';
import Modal from '../Modal/Modal';
import Backdrop from '../Backdrop/Backdrop';
import UserContext from '../Context/auth-context';

class EventsPage extends Component {
    state = {
        creatingEvent: false,
        events: []
    };

    // allows us to use nearest curr value of that context type
    // that is passed by App.js using this.context
    static contextType = UserContext; 

    constructor(props) {
        super(props);
        this.titleElement = React.createRef();
        this.priceElement = React.createRef();
        this.dateElement = React.createRef();
        this.descriptionElement = React.createRef();
    }

    componentDidMount() {
        // executes when page loads
        this.fetchEvents();
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

        if(title.trim().length === 0 || price <= 0
            || date.trim().length === 0 || description.trim().length === 0) {
                return;
        }

        const event = {title: title, price: price, date: date, description: description};
        console.log(event);

        let requestBody = {
            query: `
                mutation {
                    createEvent(input: {title: "${title}", description: "${description}", price: ${price}, date: "${date}"}) {
                        _id
                        title
                        description
                        price
                        date
                        creator {
                            _id
                            email
                        }
                    }
                }
                `
        }; // define the request body

        // need to send this request to the backend using fetch method

        const token = this.context.token;

        fetch('http://localhost:8000/graphql', {
            method: 'POST',
            body: JSON.stringify(requestBody),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + token
            }
        }).then(res => {
            if(res.status !== 200 && res.status !== 201) {
                throw new Error("Failed!");
            }

            return res.json();
        }).then(resData => {
            console.log(resData);
            this.fetchEvents();
        }).catch(err => {
            console.log(err);
        });

    }

    fetchEvents() {
        let requestBody = {
            query: `
                query {
                    events {
                        _id
                        title
                        description
                        price
                        date
                        creator {
                            _id
                            email
                        }
                    }
                }
                `
        }; // define the request body

        // need to send this request to the backend using fetch method

        fetch('http://localhost:8000/graphql', {
            method: 'POST',
            body: JSON.stringify(requestBody),
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(res => {
            if(res.status !== 200 && res.status !== 201) {
                throw new Error("Failed!");
            }

            return res.json();
        }).then(resData => {
            console.log(resData);
            const events = resData.data.events;
            this.setState({events: events});
        }).catch(err => {
            console.log(err);
        });

    }

    render() {

        // prepare the list of events here
        const eventsList = this.state.events.map(event => {
            return (
                <li key={event._id} className="event_item">
                    {event.title}
                </li>);
        });

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
                {this.context.token && <div className="createEvent">
                    <p className="eventsHeader">Invite others to your event</p>
                    <button className="eventBtn" onClick={this.handleCreateEvent}>Create Event</button>
                </div>}

                <ul className="events_list">
                   {eventsList}
                </ul>
            
            </React.Fragment>);
    }
}

export default EventsPage;