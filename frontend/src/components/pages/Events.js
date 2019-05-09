import React, { Component } from "react";

import './Events.css';
import Modal from '../Modal/Modal';
import Backdrop from '../Backdrop/Backdrop';
import UserContext from '../Context/auth-context';
import EventList from '../Elements/EventsList/EventList';
import Spinner from '../Elements/Spinner/Spinner';

class EventsPage extends Component {
    state = {
        creatingEvent: false,
        events: [],
        isLoading: false,
        selectedEvent: null
    };

    isActive = true;

    componentWillUnMount = () => {
        this.isActive = false;
    }

    // allows us to use nearest curr value of that context type
    // that is passed by App.js using notation -> this.context
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
            creatingEvent: false,
            selectedEvent: null
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

        const requestBody = {
            query: `
                mutation CreateEvent($title: String!, $description: String!, $price: Float!, $date: String!) {
                    createEvent(input: {title: $title, description: $description, price: $price, date: $date}) {
                        _id
                        title
                        description
                        price
                        date
                    }
                }
                `,
            variables: {
                title: title,
                description: description,
                price: price,
                date: date
            }
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
            this.setState(prevState => {
                const latestEvents = [...prevState.events]; // copy the events array
                latestEvents.push({
                    _id: resData.data.createEvent._id,
                    title: resData.data.createEvent.title,
                    description: resData.data.createEvent.description,
                    price: resData.data.createEvent.price,
                    date: resData.data.createEvent.date,
                    creator: {
                        _id: this.context.userID
                    }
                });

                return {events: latestEvents};
            })
        }).catch(err => {
            console.log(err);
        });

    }

    handleBookEvent = eventId => {

        const requestBody = {
            query: `
                mutation bookEvent($eventId: ID!){
                    bookEvent(eventId: $eventId) {
                        _id
                        createdAt
                        updatedAt
                    }
                }
                `,
            variables: {
                eventId: this.state.selectedEvent._id
            }
        }; // define the request body

        // need to send this request to the backend using fetch method

        const token = this.context.token;

        fetch('http://localhost:8000/graphql', {
            method: 'POST',
            body: JSON.stringify(requestBody),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + this.context.token
            }
        }).then(res => {
            if(res.status !== 200 && res.status !== 201) {
                throw new Error("Failed!");
            }

            return res.json();
        }).then(resData => {
            console.log(resData);
            this.setState({selectedEvent: null});
            
        }).catch(err => {
            console.log(err);
        });
    }

    handleViewDetails = eventId => {
        this.setState(prevState => {
            const selectedEvent = prevState.events.find(e => e._id === eventId);
            return {selectedEvent: selectedEvent};
        })
    }


    fetchEvents() {
        this.setState({isLoading: true});
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
            if(this.isActive) {
                this.setState({events: events, isLoading: false});
            }
        }).catch(err => {
            console.log(err);
            if(this.isActive) {
                this.setState({isLoading: false});
            }
        });

    }

    render() {

        return (
            <React.Fragment>
                {(this.state.creatingEvent || this.state.selectedEvent) && <Backdrop/>}
                {this.state.creatingEvent && 
                    <Modal 
                        title="Add Event"
                        onCancel={this.handleCancelEvent}
                        onConfirm={this.handleConfirmEvent}
                        affirmText="Confirm"
                        affirmAvailable={true}
                        >
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
                    <button className="btn" onClick={this.handleCreateEvent}>Create Event</button>
                </div>}

                {this.state.isLoading ? (
                    <Spinner />
                )  : (
                    <EventList
                        events={this.state.events}
                        user={this.context.userID}
                        handleViewDetails={this.handleViewDetails}
                    />
                )}

                {this.state.selectedEvent && (
                    <Modal
                        title={this.state.selectedEvent.title}
                        onCancel={this.handleCancelEvent}
                        onConfirm={this.handleBookEvent}
                        affirmAvailable={this.context.token ? true : false}
                        affirmText="Book"
                        >

                        <div>
                            <h1>{this.state.selectedEvent.title}</h1>
                            <h2>${this.state.selectedEvent.price} - {new Date(this.state.selectedEvent.date).toLocaleDateString()}</h2>
                            <p>Description: {this.state.selectedEvent.description}</p>
                        </div>
                    </Modal>
                    )
                }

            </React.Fragment>);
    }
}

export default EventsPage;