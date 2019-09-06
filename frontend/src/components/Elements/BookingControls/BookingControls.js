import React from "react";
import './BookingControls.css';

const bookingControls = (props) => {
    return (
        <div className="bookings-control">
            <button className={props.outputType === 'list' ? 'active' : ''} onClick={props.onOutputChange.bind(this, "list")}>List</button>
            <button className={props.outputType === 'chart' ? 'active' : ''} onClick={props.onOutputChange.bind(this, "chart")}>Chart</button>
        </div>)
    
}

export default bookingControls;