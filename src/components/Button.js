import React from "react";

import "components/Button.scss";
import { action } from "@storybook/addon-actions/dist/preview";

export default function Button(props) {
  let buttonClass = "button";

  if (props.confirm) {
    buttonClass += " button--confirm";
  }

  if (props.danger) {
    buttonClass += " button--danger";
  }


  return (
    <button
      onClick={props.onClick}
      className={buttonClass}
      disabled={props.disabled}>
      {props.children}
    </button>
  );
}
