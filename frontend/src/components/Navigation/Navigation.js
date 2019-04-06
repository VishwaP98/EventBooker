import React, { Component } from "react";
import { NavLink } from 'react-router-dom';
import './Navigation.css'
 
const mainNavigation = props => {
    return (<header className="main-navigation">
        <div className="main-navigation__logo">
            <h1>The Navbar</h1>
        </div>
        <nav className="items">
            <ul>
                <li><NavLink to="/user">Verfiy</NavLink></li>
                <li><NavLink to="/events">Events</NavLink></li>
                <li><NavLink to="/bookings">Bookings</NavLink></li>
            </ul>
        </nav>
    </header>);
}

export default mainNavigation;