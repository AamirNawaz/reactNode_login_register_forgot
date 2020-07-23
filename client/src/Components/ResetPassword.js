import React, { Component } from "react";
import { Row, Col, Form, Alert, Image, Container } from "react-bootstrap";
import { Redirect, Link } from "react-router-dom";
import logo from "../assets/images/logo.png";
//import helper
import tokenChecker from "./Helpers/tokenChecker";
import FormInputComponent from "./FormsComponents/FormInputComponent";
import FormLabelComponent from "./FormsComponents/FormLabelComponent";
import ButtonComponent from "./FormsComponents/ButtonComponent";
import FormHeadingTitle from "./FormsComponents/FormHeadingTitle";

import Axios from "axios";
class ResetPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newPassword: "",
      confirmNewPassword: "",
      message: "",
      success: false,
      error: false,
      errorPass: false,
      successPass: false,
      successMessage: "",
      token: "",
    };
  }

  componentDidMount = () => {
    this.validateResetToken();
  };

  //validateToken
  validateResetToken = async () => {
    let token = this.props.match.params.token;
    let message = "";
    let error = false;
    let success = false;
    await Axios.post("/validateResetToken", { token }).then(function (
      response
    ) {
      if (response.data.status === 201) {
        message = response.data.message;
        error = true;
        success = false;
        token = "";
      } else {
        message = response.data.message;
        error = false;
        success = true;
        token = token;
      }
    });
    this.setState({
      message,
      error,
      success,
      token,
    });
  };
  //signup
  submitHandler = async (e) => {
    e.preventDefault();
    const { newPassword, confirmNewPassword, token } = this.state;
    let data = {
      newPassword,
      confirmNewPassword,
      token,
    };
    if (newPassword === confirmNewPassword) {
      await Axios.post("/changePassword", { data }).then(function (
        response
      ) {});
      this.setState({
        successMessage: "New Password Changed Successfully",
        successPass: true,
        errorPass: false,
      });

      window.setTimeout(function () {
        window.location.href = "/login";
      }, 3000);
    } else {
      this.setState({
        successMessage: "New Password not match with Confirm password!",
        successPass: false,
        errorPass: true,
      });
    }
  };

  //onChange handler
  handleOnChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    const {
      error,
      success,
      errorPass,
      successPass,
      successMessage,
    } = this.state;
    if (error) {
      alert("Your Token Expired,Please reset again.");
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
              <Col md={4} className="login-form">
                <Image src={logo} className="logoIcon" />
                <Form onSubmit={(e) => this.submitHandler(e)}>
                  <FormHeadingTitle>Change Password</FormHeadingTitle>
                  {errorPass ? (
                    <Alert variant="danger">{successMessage}</Alert>
                  ) : (
                    <Alert
                      variant="success"
                      style={{ display: successPass ? "block" : "none" }}
                    >
                      {successMessage}
                    </Alert>
                  )}
                  <Form.Group controlId="newPassword">
                    <FormLabelComponent>New Password </FormLabelComponent>
                    <FormInputComponent
                      type="password"
                      name="newPassword"
                      placeholder="New password"
                      required="required"
                      onChange={(e) => this.handleOnChange(e)}
                    />
                  </Form.Group>

                  <Form.Group controlId="newPassword">
                    <FormLabelComponent>
                      Confirm New Password{" "}
                    </FormLabelComponent>
                    <FormInputComponent
                      type="password"
                      name="confirmNewPassword"
                      placeholder="Confirm New password"
                      required="required"
                      onChange={(e) => this.handleOnChange(e)}
                    />
                  </Form.Group>

                  <ButtonComponent
                    variant="info btn-block"
                    type="submit"
                    value="Update"
                    name="update"
                    id="update"
                  >
                    Change password
                  </ButtonComponent>
                </Form>{" "}
              </Col>
            </Row>
          </Container>
        </div>
      </React.Fragment>
    );
  }
}

export default ResetPassword;
