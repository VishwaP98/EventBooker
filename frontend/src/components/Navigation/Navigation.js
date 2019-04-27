import React, { Component } from "react";
import { NavLink } from 'react-router-dom';
import UserContext from '../context/auth-context';
import './Navigation.css'
 
const mainNavigation = props => (
    <UserContext.Consumer>
        {(context) => {
            return (
                <header className="main-navigation">
                    <div className="main-navigation__logo">
                        <h1>EventBooker</h1>
                    </div>
                    <nav className="items">
                        <ul>
                            {!context.token && <li><NavLink to="/user">Login</NavLink></li>}
                            <li><NavLink to="/events">Events</NavLink></li>
                            {context.token && (
                                <React.Fragment className="reactFragment">
                                    <li><NavLink to="/bookings">Bookings</NavLink></li>
                                    <li><button onClick={context.logout}>Logout</button></li>
                                </React.Fragment>)}
                        </ul>
                    </nav>
                </header>
            );
        }}

    </UserContext.Consumer>
)

export default mainNavigation;