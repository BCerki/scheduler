import React from "react";
import DayListItem from "components/DayListItem";

export default function DayList(props) {

  const list = props.days.map(day => {
    return (
      <DayListItem
        key={day.id}
        name={day.name} //do I need?
        spots={day.spots}
        selected={day.name === props.day}
        setDay={event => props.setDay(day.name)} //name or id?
      />)
  })

  return (
    < ul >
      {list}
    </ul>
  )
}
