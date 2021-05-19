import React from "react";
import classNames from "classnames";

import "components/Button.scss";

export default function Button(props) {
  //Conditional styling
  let buttonClass = classNames(
    "button",
    { "button--confirm": props.confirm },
    { "button--danger": props.danger }
  );

  //Button component
  return (
    <button
      onClick={props.onClick}
      className={buttonClass}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
}
