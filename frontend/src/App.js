import React, { Component } from 'react';

import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import './App.css';
import UserPage from './components/pages/User';
import EventsPage from './components/pages/Events';
import BookingsPage from './components/pages/Bookings';
import MainNavigation from './components/Navigation/Navigation';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <React.Fragment>
          <MainNavigation/>
            <main>
            <Switch>
              <Redirect from="/" to="/user" exact/>
              <Route path="/user" component={UserPage}/>
              <Route path="/events" component={EventsPage}/>
              <Route path="/bookings" component={BookingsPage}/>
            </Switch>

            </main>

        </React.Fragment>
        
      </BrowserRouter>
    );
  }
}

export default App;
