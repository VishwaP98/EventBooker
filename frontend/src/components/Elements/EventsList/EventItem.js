import React from 'react';

import './EventItem.css';

const eventItem = props => {
    return (
        <li key={props.eventId} className="event_item">
            <div>
                <h1>{props.title}</h1>
                <h2>${props.price} - {new Date(props.date).toLocaleDateString()}</h2>
            </div>
            <div>
                {props.user === props.creator ? (
                <p>Owner</p>
                 ) : (
                 <button className="btn" onClick={props.onViewDetails.bind(this, props.eventId)}>View Details</button>)}
            </div>
        </li>);
        // it is essential to bind because we are not executing the onViewDetails right now so when button is
        // pressed we will execute onViewDetails with parameters attached using bind method
};

export default eventItem;