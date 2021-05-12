const getAppointmentsForDay = function (state, day) {
  //grab a particular day's appointments' ids
  let appointmentIds = [];
  for (const weekday of state.days) {
    if (weekday.name === day) {
      appointmentIds = [...weekday.appointments]
    }
  }

  //pull the appointment details based on their id number
  const appointmentsForDay = [];

  for (const key in state.appointments) {
    if (appointmentIds.includes(Number(key))) {
      appointmentsForDay.push(state.appointments[key]); //is pushing allowed in helper functions? Mutating state?
    }
  }

  return appointmentsForDay;


};
export { getAppointmentsForDay };
//Test Code
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
//   }
// };

// getAppointmentsForDay(state, "Tuesday")
