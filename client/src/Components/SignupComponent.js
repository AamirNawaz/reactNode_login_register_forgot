import React, { Component } from "react";
import { Row, Col, Form, Image, Container, Alert } from "react-bootstrap";
import { Redirect, Link } from "react-router-dom";
import logo from "../assets/images/logo.png";
import Axios from "axios";
//import helper
import tokenChecker from "./Helpers/tokenChecker";
import FormInputComponent from "./FormsComponents/FormInputComponent";
import FormLabelComponent from "./FormsComponents/FormLabelComponent";
import ButtonComponent from "./FormsComponents/ButtonComponent";
import FormHeadingTitle from "./FormsComponents/FormHeadingTitle";

class SignupComponent extends Component {
  constructor(props) {
    super(props);
    //checking localStorage token
    let logggedIn = false;
    let returnToken = tokenChecker(logggedIn);

    this.state = {
      logggedIn: returnToken,
      fullname: "",
      email: "",
      password: "",
      confirmPassword: "",
      message: "",
      error: false,
      success: false,
    };
  }

  //signup
  submitHandler = async (e) => {
    e.preventDefault();
    const { fullname, email, password, confirmPassword } = this.state;
    let data = {
      fullname,
      email,
      password,
      confirmPassword,
    };
    let message = "";
    let error = false;
    let success = false;
    await Axios.post("/signup", { data }).then(function (response) {
      if (response.status === 200) {
        message = response.data.message;
        error = false;
        success = true;
      } else {
        message = response.data.message;
        error = true;
        success = false;
      }
    });

    this.setState({
      message,
      error,
      success,
    });

    if (success) {
      window.setTimeout(function () {
        window.location.href = "/login";
      }, 3000);
    }
  };

  //onChange handler
  handleOnChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
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
              <Col md={4} className="signup-form">
                <Image src={logo} className="logoIcon" />
                <Form onSubmit={(e) => this.submitHandler(e)}>
                  <FormHeadingTitle>Signup Form</FormHeadingTitle>
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
                    <FormLabelComponent>Name </FormLabelComponent>
                    <FormInputComponent
                      type="text"
                      name="fullname"
                      placeholder="Full Name"
                      required="required"
                      onChange={(e) => this.handleOnChange(e)}
                    />
                  </Form.Group>
                  <Form.Group controlId="email">
                    <Form.Label>Email address</Form.Label>
                    <FormInputComponent
                      type="email"
                      name="email"
                      placeholder="Enter your email"
                      required="required"
                      onChange={(e) => this.handleOnChange(e)}
                    />
                  </Form.Group>

                  <Form.Group controlId="password">
                    <FormLabelComponent>Password</FormLabelComponent>
                    <FormInputComponent
                      type="password"
                      name="password"
                      placeholder="Password"
                      required="required"
                      onChange={(e) => this.handleOnChange(e)}
                    />
                  </Form.Group>

                  <Form.Group controlId="password">
                    <FormLabelComponent>Confirm Password</FormLabelComponent>
                    <FormInputComponent
                      type="password"
                      name="confirmPassword"
                      placeholder="Confirm Password"
                      required="required"
                      onChange={(e) => this.handleOnChange(e)}
                    />
                  </Form.Group>

                  <ButtonComponent
                    variant="info btn-block"
                    type="submit"
                    value="Sign up"
                    name="Login"
                    id="Login"
                  >
                    Sign up
                  </ButtonComponent>
                </Form>
                <p>
                  Already have an account{" "}
                  <Link to="/login">
                    <strong>Login Now</strong>
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

export default SignupComponent;
