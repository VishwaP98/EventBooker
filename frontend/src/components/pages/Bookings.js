import React, { Component } from "react";

import UserContext from '../Context/auth-context';
import Spinner from '../Elements/Spinner/Spinner';
import BookingList from '../Elements/BookingsList/BookingList';
import BookingChart from '../Elements/BookingChart/BookingChart';
import BookingControls from "../Elements/BookingControls/BookingControls";

class BookingsPage extends Component {

    state = {
        isLoading: false,
        bookings: [],
        outputType: 'list'
    };

    static contextType = UserContext;

    componentDidMount = () => {
        this.fetchBookings();
    }

    cancelBookingHandler = (bookingId) => {
        this.setState({isLoading: true});
        const requestBody = {
            query: `
                mutation CancelBooking($id: ID!) {
                    cancelBooking(bookingID: $id) {
                        _id
                        title
                    }
                }
                `,
            variables: {
                id: bookingId
            }
        };

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
            this.setState(prevState => {
                // filter returns a new array, 
                const latestBookings = prevState.bookings.filter(booking => {
                    return booking._id !== bookingId; // true here means element will be kept, false means remove
                });

                return {bookings: latestBookings, isLoading: false};
                
            });
        }).catch(err => {
            console.log(err);
            this.setState({isLoading: false});
        });

    }

    fetchBookings = () => {

        this.setState({isLoading: true});

        const requestBody = {
            query: `
                query {
                    bookings {
                        _id
                        createdAt
                        event {
                            _id
                            title
                            date
                            price
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
                'Authorization': "Bearer " + this.context.token
            }
        }).then(res => {
            if(res.status !== 200 && res.status !== 201) {
                throw new Error("Failed!");
            }

            return res.json();
        }).then(resData => {
            console.log(resData);
            const bookings = resData.data.bookings;
            this.setState({bookings: bookings, isLoading: false});
        }).catch(err => {
            console.log(err);
            this.setState({isLoading: false});
        });


    }

    findOutputTypeHandler = (outputType) => {

        let newType = null
        
        if(outputType === 'list'){
            newType = outputType
        } else {
            newType = 'chart'
        }

        this.setState({outputType: newType})
    }

    render() {

        let content = <Spinner/>

        if(!this.state.isLoading) {
            // if not loading

            content = (
                <React.Fragment>
                    <BookingControls outputType={this.state.outputType} onOutputChange={this.findOutputTypeHandler}/>
                    <div>
                        {this.state.outputType === 'list' ? (<BookingList bookings={this.state.bookings} onCancel={this.cancelBookingHandler}/>) : 
                        (<BookingChart bookings={this.state.bookings}/>)}
                    </div>
                </React.Fragment>
            )

        }

        return <React.Fragment>{content}</React.Fragment>
    }
}

export default BookingsPage;