import React, { Component } from "react";
import './User.css';
class UserPage extends Component {

    constructor(props) {
        super(props);
        this.emailElement = React.createRef();
        this.passwordElement = React.createRef();
    }

    submitHandler = (event) => {
        event.preventDefault();
        const email = this.emailElement.current.value;
        const password = this.passwordElement.current.value;

        if(email.trim().length === 0 || password.trim().length === 0) {
            return; // we will not send empty email/password
        }

        console.log(email, password);

        const requestBody = {

            query: `
                mutation {
                    createUser(userInput: {email: "${email}", password: "${password}"}) {
                        _id
                        email
                    }
                }    
            `

        } 

        // send a request to the backend
        fetch("http://localhost:8000/graphql", {
            method: "POST",
            body: JSON.stringify(requestBody),
            headers: {
                "Content-Type": "application/json"
            }
        })
    }

    render() {
        return (<form className="user-form" onSubmit={this.submitHandler}>
            <div className="form-control">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" ref={this.emailElement}/>
            </div>

            <div className="form-control">
                <label htmlFor="password">Password</label>
                <input type="password" id="password" ref={this.passwordElement}/>
            </div>

            <div className="form-actions">
                <button type="submit">Submit</button>
                <button type="button">SignUp</button>
            </div>

        </form>);
    }
}

export default UserPage;