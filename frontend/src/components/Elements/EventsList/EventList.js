import React from 'react';

import './EventList.css';
import EventItem from './EventItem';

const eventsList = (props) => {
    const events = props.events.map(event => {
        return (
            <EventItem 
                key={event._id} 
                eventId={event._id} 
                title={event.title} 
                price={event.price}
                date={event.date}
                user={props.user}
                onViewDetails={props.handleViewDetails}
                creator={event.creator._id}
            />
        );
    });

    return (<ul className="events_list">{events}</ul>);
};

export default eventsList;
