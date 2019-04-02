import React, { Component } from 'react';

import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import './App.css';
import UserPage from './components/User';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Redirect from="/" to="/user" exact/>
          <Route path="/user" component={UserPage}/>
          <Route path="/events" component={null}/>
          <Route path="/bookings" component={null}/>
        </Switch>
       
      
      </BrowserRouter>
    );
  }
}

export default App;
