import React from "react";

function FormHeadingTitle(props) {
  return (
    <React.Fragment>
      <h1>{props.children}</h1>
    </React.Fragment>
  );
}

export default FormHeadingTitle;
