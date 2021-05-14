import React, { Fragment } from 'react'
import "components/Appointment/styles.scss"
import Header from "components/Appointment/Header"
import Show from "components/Appointment/Show"
import Empty from "components/Appointment/Empty"
import Form from "components/Appointment/Form"
import Status from "components/Appointment/Status"
import useVisualMode from "../../hooks/useVisualMode"

export default function Appointment(props) {
  //mode constants
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";

  console.log('props in index.js:', props)

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    }
    transition(SAVING);
    props.bookInterview(props.id, interview)
      .then(res => {
        transition(SHOW);
      })
  };



  const { mode, transition, back } = useVisualMode(props.interview ? SHOW : EMPTY)

  //props could be wrong below
  return (
    <>
      <Header time={props.time} />
      <article className="appointment">

        {mode === EMPTY &&
          <Empty
            onAdd={() => transition(CREATE)} />}

        {mode === SAVING &&
          <Status
            message={"Saving..."} />}

        {mode === CREATE &&
          <Form
            interviewers={props.interviewers}
            onSave={save}
            onCancel={() => { back() }} />}

        {mode === SHOW && (
          <Show
            student={props.interview.student}
            interviewer={props.interview.interviewer}
          />
        )}

      </article>
    </>)
}
