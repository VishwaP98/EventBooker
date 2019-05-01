import React from 'react';

import './EventItem.css';

const eventItem = props => {
    return (<li key={props.eventId} className="event_item">{props.title}</li>);
};

export default eventItem;