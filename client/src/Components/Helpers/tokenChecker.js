import React from "react";

function tokenChecker(logggedIn) {
  const token = localStorage.getItem("token");
  if (token) {
    logggedIn = true;
    return logggedIn;
  } else {
    logggedIn = false;
    return logggedIn;
  }
}

export default tokenChecker;
