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
////Test Code FIXFIX
// const state = {
//   days: [
//     {
//       id: 1,
//       name: "Monday",
//       appointments: [1, 2, 3]
//     },
//     {
//       id: 2,
//       name: "Tuesday",
//       appointments: [4, 5]
//     }
//   ],
//   appointments: {
//     "1": { id: 1, time: "12pm", interview: null },
//     "2": { id: 2, time: "1pm", interview: null },
//     "3": {
//       id: 3,
//       time: "2pm",
//       interview: { student: "Archie Cohen", interviewer: 2 }
//     },
//     "4": { id: 4, time: "3pm", interview: null },
//     "5": {
//       id: 5,
//       time: "4pm",
//       interview: { student: "Chad Takahashi", interviewer: 2 }
//     }
//   },
//   interviewers: {
//     "1": {
//       "id": 1,
//       "name": "Sylvia Palmer",
//       "avatar": "https://i.imgur.com/LpaY82x.png"
//     },
//     "2": {
//       id: 2,
//       name: "Tori Malcolm",
//       avatar: "https://i.imgur.com/Nmx0Qxo.png"
//     }
//   }
// };

// // console.log(getAppointmentsForDay(state, "Tuesday"))

// getInterview(state, {
//   "id": 1,
//   "time": "12pm",
//   "interview": {
//     "student": "Lydia Miller-Jones",
//     "interviewer": 1
//   }
// })
