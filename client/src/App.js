import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { Switch, Route } from "react-router-dom";
import LoginComponent from "./Components/LoginComponent";
import Dashboard from "./Components/Dashboard";
import Logout from "./Components/LogoutComponent";
import Forgot from "./Components/ForgotPassword";
import Signup from "./Components/SignupComponent";
import ResetPassword from "./Components/ResetPassword";

function App() {
  return (
    <Switch>
      <Route exact path="/" component={LoginComponent} />
      <Route path="/login" component={LoginComponent} />
      <Route path="/logout" component={Logout} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/forgot" component={Forgot} />
      <Route path="/signup" component={Signup} />
      <Route path="/reset/:token" component={ResetPassword} />
    </Switch>
  );
}

export default App;
