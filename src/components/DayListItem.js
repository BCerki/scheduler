import React from "react";
import classNames from "classnames";

import "components/DayListItem.scss";
import { action } from "@storybook/addon-actions/dist/preview";

export default function DayListItem(props) {
  //Conditional styling
  let dayClass = classNames(
    "day-list__item",
    { "day-list__item--selected": props.selected },
    { "day-list__item--full": props.spots === 0 }
  );

  //Makes the spots remaining phrase grammatically correct
  const formatSpots = function (spots) {
    let string = "remaining";
    if (spots > 1) {
      string = `${spots} spots ${string}`;
    }
    if (spots === 1) {
      string = `${spots} spot ${string}`;
    }
    if (spots === 0) {
      string = `no spots ${string}`;
    }

    return <>{string}</>;
  };
  //DayListItem component
  return (
    <li className={dayClass} onClick={props.setDay} data-testid="day">
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots(props.spots)}</h3>
    </li>
  );
}
