import React from "react";
import { Form } from "react-bootstrap";
function FormLabelComponent(props) {
  return (
    <React.Fragment>
      <Form.Label>{props.children}</Form.Label>
    </React.Fragment>
  );
}

export default FormLabelComponent;
