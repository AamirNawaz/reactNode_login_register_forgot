import React from "react";
import { Row, Col, Form, Button, Image, Container } from "react-bootstrap";

function FormInputComponent(props) {
  return (
    <Form.Control
      type={props.type}
      placeholder={props.placeholder}
      required={props.required}
      name={props.name}
      onChange={props.onChange}
      id={props.id}
      className={props.class}
    />
  );
}

export default FormInputComponent;
