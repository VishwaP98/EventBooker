import React from 'react';

import './BookingList.css';

const bookingList = (props) => {

    return (
        <ul className="bookings">
           {props.bookings.map(booking => {
               return (
                    <li key={booking._id} className="bookings_item">
                        <div className="bookings_item_data">
                            {booking.event.title} - {new Date(booking.createdAt).toLocaleDateString()}
                        </div>
                        <div className="bookings_item_actions">
                            <button className="btn" onClick={props.onCancel.bind(this, booking._id)}>Cancel Booking</button>
                        </div>
                    </li>
               )
           })} 

        </ul>
    );

}

export default bookingList;