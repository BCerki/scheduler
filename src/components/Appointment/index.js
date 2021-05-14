import React, { Fragment } from 'react'
import "components/Appointment/styles.scss"
import Header from "components/Appointment/Header"
import Show from "components/Appointment/Show"
import Empty from "components/Appointment/Empty"
import Form from "components/Appointment/Form"
import Status from "components/Appointment/Status"
import Confirm from "components/Appointment/Confirm"
import Error from "components/Appointment/Error"
import useVisualMode from "../../hooks/useVisualMode"

export default function Appointment(props) {
  //mode constants
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const CONFIRM = "CONFIRM";
  const DELETING = "DELETING";
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";

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
      .catch(res => {
        transition(ERROR_SAVE);
      })
  };

  function cancel(id) {
    transition(DELETING);
    props.cancelInterview(props.id)
      .then(res => {
        transition(EMPTY);
      })
      .catch(res => {
        transition(ERROR_DELETE)
      })
  };



  const { mode, transition, back } = useVisualMode(props.interview ? SHOW : EMPTY)

  //props could be wrong below
  //when do I need to use callbacks vs functions in my components????? FIXFIX
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

        {mode === CONFIRM &&
          <Confirm
            message={"Are you sure you would like to delete?"}
            onCancel={() => back()}
            onConfirm={cancel} />}

        {mode === DELETING &&
          <Status
            message={"Deleting..."} />}

        {mode === CREATE &&
          <Form
            interviewers={props.interviewers}
            onSave={save}
            onCancel={() => { back() }} />}

        {mode === EDIT &&
          <Form
            name={props.interview.student}
            interviewer={props.interview.interviewer.id}
            interviewers={props.interviewers}
            onSave={save}
            onCancel={() => { back() }} />}


        {mode === SHOW && (
          <Show
            student={props.interview.student}
            interviewer={props.interview.interviewer}
            onEdit={() => transition(EDIT)}
            onDelete={() => transition(CONFIRM)}
          />
        )}

        {mode === ERROR_SAVE && (
          <Error
            message={"Error saving"} />
        )}
        {mode === ERROR_DELETE && (
          <Error
            message={"Error deleting"} />
        )}

      </article>
    </>)
}
