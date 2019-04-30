import React, { Component } from "react";
import './User.css';
import UserContext from '../Context/auth-context';

class UserPage extends Component {

    state = {
        isLogin: true
    };

    static contextType = UserContext;

    constructor(props) {
        super(props);
        this.emailElement = React.createRef();
        this.passwordElement = React.createRef();
    }

    switchHandler = () => {
        this.setState(prevState => {
            return {isLogin: !prevState.isLogin};
        });
    }

    submitHandler = (event) => {
        event.preventDefault();
        const email = this.emailElement.current.value;
        const password = this.passwordElement.current.value;

        if(email.trim().length === 0 || password.trim().length === 0) {
            return; // we will not send empty email/password
        }

        console.log(email, password);

        let requestBody = {
            query: `
                query {
                    login(email: "${email}", password: "${password}") {
                        userID
                        token
                        tokenExpiration
                    }
                }
            `
        }

        if(!this.state.isLogin) { // if not login mode then set create user request
            requestBody = {
                query: `
                    mutation {
                        createUser(userInput: {email: "${email}", password: "${password}"}) {
                            _id
                            email
                        }
                    }    
                `
            }
        } 

        // send a request to the backend
        fetch("http://localhost:8000/graphql", {
            method: "POST",
            body: JSON.stringify(requestBody),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => {
            if(res.status !== 200 && res.status !== 201) {
                throw new Error("Something failed!");
            }
            
            // otherwise just return the response json
            return res.json();
        }).then(resData => {
            
            console.log(resData);

            if(resData.data.login.token) {
                this.context.login(resData.data.login.token,
                    resData.data.login.userID,
                    resData.data.login.tokenExpiration);
            }

        }).catch(err => {
            // this err is not from backend but possibly a network error
            console.log(err);
        });
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
                <button type="button" onClick={this.switchHandler}>
                    Switch to {this.state.isLogin ? "SignUp" : "Login"}
                </button>
            </div>

        </form>);
    }
}

export default UserPage;