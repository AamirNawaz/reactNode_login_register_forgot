import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";

//import helper
import tokenChecker from "./Helpers/tokenChecker";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    let logggedIn = false;

    let returnToken = tokenChecker(logggedIn);

    this.state = {
      logggedIn: returnToken,
    };
  }

  LogoutUser = () => {
    this.setState({
      logggedIn: false,
    });
  };

  render() {
    if (!this.state.logggedIn) {
      return <Redirect to="/logout" />;
    }
    return (
      <div>
        <h2>Welcome to Dashboard </h2>
        <Link to="/logout" onClick={this.LogoutUser}>
          Logout
        </Link>
      </div>
    );
  }
}

export default Dashboard;
