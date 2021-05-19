//Helper function to transform data and return an array of appointments for a particular day
const getAppointmentsForDay = function (state, day) {
  //grab a particular day's appointments
  const dailyAppointments = state.days.find((weekday) => weekday.name === day);
  //if the day has appointments, pull the appointment details based on their id number
  if (dailyAppointments) {
    return dailyAppointments.appointments.map(
      (appt) => state.appointments[appt]
    );
  }
  return [];
};

//Helper function to transform data and return a particular interview
const getInterview = function (state, interview) {
  //validate--if there's no interview, return null
  if (!interview) {
    return null;
  }

  //pull the interviewer's details based on their id
  let interviewerDetails = null;
  for (const key in state.interviewers) {
    if (Number(key) === interview.interviewer) {
      interviewerDetails = state.interviewers[key];
    }
  }

  return {
    student: interview.student,
    interviewer: interviewerDetails,
  };
};

//Helper function to transform data and return an array of interviewers for a particular day
const getInterviewersForDay = function (state, day) {
  //pull a particular day's appointments
  const dailyInterviewers = state.days.find((weekday) => weekday.name === day);
  //if the day has appointments, pull the appointment details based on their id number
  if (dailyInterviewers) {
    return dailyInterviewers.interviewers.map((id) => state.interviewers[id]);
  }
  return [];
};
export { getAppointmentsForDay, getInterview, getInterviewersForDay };
