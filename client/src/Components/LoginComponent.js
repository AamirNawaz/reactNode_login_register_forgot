import React, { Component } from "react";
import Axios from "axios";
import { Redirect, Link } from "react-router-dom";
import { Row, Col, Form, Alert, Image, Container } from "react-bootstrap";
import logo from "../assets/images/logo.png";
//import helper
import tokenChecker from "./Helpers/tokenChecker";
import FormInputComponent from "./FormsComponents/FormInputComponent";
import FormLabelComponent from "./FormsComponents/FormLabelComponent";
import ButtonComponent from "./FormsComponents/ButtonComponent";
import FormHeadingTitle from "./FormsComponents/FormHeadingTitle";

class LoginComponent extends Component {
  constructor(props) {
    super(props);

    //checking localStorage token
    let logggedIn = false;
    let returnToken = tokenChecker(logggedIn);

    this.state = {
      email: "",
      password: "",
      logggedIn: returnToken,
      message: "",
      error: false,
      success: false,
    };
  }

  onChangeHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  onSubmitHandler = async (e) => {
    e.preventDefault();
    const { email, password } = this.state;
    let tokenKey = "";
    let message = "";

    try {
      await Axios.post("/login", { email, password }).then(function (response) {
        message = response.data.message;
        tokenKey = response.data.token;
      });

      //Set token in localStorage
      if (tokenKey) {
        localStorage.setItem("token", tokenKey);
        this.setState({
          logggedIn: true,
          error: false,
          success: true,
          message: message,
        });
      } else {
        this.setState({
          logggedIn: false,
          error: true,
          success: false,
          message: message,
        });
      }
    } catch (err) {
      this.setState({
        error: err.message,
      });
    }
  };
  render() {
    const { error, message, success } = this.state;
    if (this.state.logggedIn) {
      return <Redirect to="/dashboard"></Redirect>;
    }
    return (
      <React.Fragment>
        <div className="bg">
          <Container fluid>
            <Row>
              <Col md={8} className="login-log">
                <Link to="/">
                  <Image src={logo} />
                </Link>
              </Col>
              <Col md={4} className="login-form ">
                <Form onSubmit={(e) => this.onSubmitHandler(e)}>
                  <Image src={logo} className="logoIcon" />
                  <FormHeadingTitle>Login Form</FormHeadingTitle>
                  {error ? (
                    <Alert variant="danger">{message}</Alert>
                  ) : (
                    <Alert
                      variant="success"
                      style={{ display: success ? "block" : "none" }}
                    >
                      {message}
                    </Alert>
                  )}
                  <Form.Group controlId="email">
                    <FormLabelComponent>Email address</FormLabelComponent>
                    <FormInputComponent
                      type="email"
                      name="email"
                      placeholder="Enter your email"
                      required="required"
                      onChange={(e) => this.onChangeHandler(e)}
                    />
                  </Form.Group>

                  <Form.Group controlId="password">
                    <FormLabelComponent>Password</FormLabelComponent>
                    <FormInputComponent
                      type="password"
                      name="password"
                      placeholder="Password"
                      required="required"
                      onChange={(e) => this.onChangeHandler(e)}
                    />
                  </Form.Group>

                  <ButtonComponent
                    variant="info btn-block"
                    type="submit"
                    value="Login"
                    name="Login"
                    id="Login"
                  >
                    Login
                  </ButtonComponent>
                </Form>{" "}
                <Link to="/forgot" className="forgot-password">
                  Forgot Your password?
                </Link>
                <p>
                  Not have an account{" "}
                  <Link to="/signup">
                    <strong>signup Now</strong>
                  </Link>
                </p>
              </Col>
            </Row>
          </Container>
        </div>
      </React.Fragment>
    );
  }
}

export default LoginComponent;
