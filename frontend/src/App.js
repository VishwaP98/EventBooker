import React, { Component } from 'react';

import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import './App.css';
import UserPage from './components/pages/User';
import EventsPage from './components/pages/Events';
import BookingsPage from './components/pages/Bookings';
import MainNavigation from './components/Navigation/Navigation';
import UserContext from './components/context/auth-context';

class App extends Component {

  state = {
    token: null,
    userID: null
  }

  login = (token, userID, tokenExpiration) => {
    this.setState({
      token: token,
      userID: userID
    });
  }

  logout = () => {
    this.setState({
      token: null,
      userID: null
    });
  }

  render() {
    return (
      <BrowserRouter>
        <React.Fragment>
          <UserContext.Provider value={{token: this.state.token, userID: this.state.userID, login: this.login, logout: this.logout}}>
            <MainNavigation/>
              <main className="main-content">
              <Switch>
                {this.state.token && <Redirect from="/" to="/events" exact/>}
                {this.state.token && <Redirect from="/user" to="/events" exact/>}
                {!this.state.token && <Route path="/user" component={UserPage}/>}
                <Route path="/events" component={EventsPage}/>
                {this.state.token && <Route path="/bookings" component={BookingsPage}/>}
                {!this.state.token && <Redirect to="/user" exact/>}
              </Switch>

            </main>

          </UserContext.Provider>

        </React.Fragment>
        
      </BrowserRouter>
    );
  }
}

export default App;
