import React from "react";
import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import Form from "components/Appointment/Form";
import Status from "components/Appointment/Status";
import Confirm from "components/Appointment/Confirm";
import Error from "components/Appointment/Error";
import useVisualMode from "../../hooks/useVisualMode";

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

  //Button click functions
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer,
    };
    transition(SAVING);
    props
      .bookInterview(props.id, interview)
      .then((res) => {
        transition(SHOW);
      })
      .catch((err) => {
        transition(ERROR_SAVE, true);
        // console.log(err.message); Commented out because it makes the tests fail
      });
  }

  function cancel(event) {
    transition(DELETING, true);
    props
      .cancelInterview(props.id)
      .then((res) => {
        transition(EMPTY);
      })
      .catch((err) => {
        transition(ERROR_DELETE, true);
        // console.log(err.message);
      });
  }

  //Bring in functions from custom hook
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  //Appointment component
  return (
    <>
      <Header time={props.time} />
      <article className="appointment" data-testid="appointment">
        {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}

        {mode === SAVING && <Status message={"Saving..."} />}

        {mode === CONFIRM && (
          <Confirm
            message={"Are you sure you would like to delete?"}
            onCancel={back}
            onConfirm={cancel}
          />
        )}

        {mode === DELETING && <Status message={"Deleting..."} />}

        {mode === CREATE && (
          <Form
            interviewers={props.interviewers}
            onSave={save}
            onCancel={back}
          />
        )}

        {mode === EDIT && (
          <Form
            name={props.interview.student}
            interviewer={props.interview.interviewer.id}
            interviewers={props.interviewers}
            onSave={save}
            onCancel={back}
          />
        )}

        {mode === SHOW && (
          <Show
            student={props.interview.student}
            interviewer={props.interview.interviewer}
            onEdit={() => transition(EDIT)}
            onDelete={() => transition(CONFIRM)}
          />
        )}

        {mode === ERROR_SAVE && (
          <Error message={"Error saving"} onClose={back} />
        )}
        {mode === ERROR_DELETE && (
          <Error message={"Error deleting"} onClose={back} />
        )}
      </article>
    </>
  );
}
