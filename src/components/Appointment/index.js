import React, { Fragment } from 'react'
import "components/Appointment/styles.scss"
import Header from "components/Appointment/Header"
import Show from "components/Appointment/Show"
import Empty from "components/Appointment/Empty"
import useVisualMode from "../../hooks/useVisualMode"

export default function Appointment(props) {


  //mode constants
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";



  const { mode, transition, back } = useVisualMode(props.interview ? SHOW : EMPTY)


  return (
    <>
      <Header time={props.time} />
      <article className="appointment">
        {mode === EMPTY && <Empty onAdd={() => console.log("Clicked onAdd")} />}
        {mode === SHOW && (
          <Show
            student={props.interview.student}
            interviewer={props.interview.interviewer}
          />
        )}

      </article>
    </>)
}
