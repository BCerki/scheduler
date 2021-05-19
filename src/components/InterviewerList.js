import React from "react";
import PropTypes from 'prop-types';
import InterviewerListItem from "components/InterviewerListItem"
import "components/InterviewerList.scss"



function InterviewerList(props) {
  //Create individual interviwer items
  const interviewers = props.interviewers.map(interviewer => {
    return (
      <InterviewerListItem
        key={interviewer.id}
        name={interviewer.name}
        avatar={interviewer.avatar}
        selected={interviewer.id === props.interviewer}
        setInterviewer={event => props.setInterviewer(interviewer.id)}
      />)
  })
  //InterviewerList component
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {interviewers}
      </ul>
    </section>
  )

}
//Prop types validation
InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired
}
export default InterviewerList;
