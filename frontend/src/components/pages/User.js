import React, { Component } from "react";
import './User.css';
class UserPage extends Component {

    render() {
        return (<form className="user-form">
            <div className="form-control">
                <label htmlFor="email">Email</label>
                <input type="email" id="email"/>
            </div>

            <div className="form-control">
                <label htmlFor="password">Password</label>
                <input type="password" id="password"/>
            </div>

            <div className="form-actions">
                <button type="submit">Submit</button>
                <button type="button">SignUp</button>
            </div>

        </form>);
    }
}

export default UserPage;