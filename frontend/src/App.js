import React, { Component } from 'react';

import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import './App.css';
import UserPage from './components/User';
import EventsPage from './components/Events';
import BookingsPage from './components/Bookings';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Redirect from="/" to="/user" exact/>
          <Route path="/user" component={UserPage}/>
          <Route path="/events" component={EventsPage}/>
          <Route path="/bookings" component={BookingsPage}/>
        </Switch>
       
      
      </BrowserRouter>
    );
  }
}

export default App;
