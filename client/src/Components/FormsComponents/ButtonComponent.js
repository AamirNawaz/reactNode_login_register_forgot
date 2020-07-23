import React from "react";
import { Button } from "react-bootstrap";
function ButtonComponent(props) {
  return (
    <React.Fragment>
      <Button
        variant={props.variant}
        type={props.type}
        value={props.value}
        name={props.name}
        id={props.id}
      >
        {props.children}
      </Button>
    </React.Fragment>
  );
}

export default ButtonComponent;
