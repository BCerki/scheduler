import { useState, useEffect } from "react";
import axios from "axios";

const useApplicationHook = function () {
  //State updates
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });
  const setDay = (day) => setState({ ...state, day });

  //Custom hook
  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ]).then((all) => {
      setState((prev) => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      }));
    });
  }, []);

  const updateSpots = function (id, appointments) {
    //make a copy of the day object that the id belongs to
    const dayCopy = state.days.find((day) => day.appointments.includes(id));

    const appointmentsInDay = dayCopy.appointments;

    //sum the number of interviews that are null (if interview is null, the spot is open)
    const spotsRemaining = appointmentsInDay.reduce((tally, appt) => {
      if (!appointments[appt].interview) {
        tally++;
      }
      return tally;
    }, 0);

    //add the spotsRemaining to the copied day object
    dayCopy.spots = spotsRemaining;

    //copy the days array
    const daysCopy = [...state.days];

    //add the updated day obj to the copied days array
    const updatedDays = daysCopy.map((day) =>
      day.id === dayCopy.id ? dayCopy : day
    );

    return updatedDays;
  };

  const bookInterview = function (id, interview) {
    //Create variables with new interview info (will be used to update state)
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    //Axios request to book the interview
    return axios
      .put(`/api/appointments/${id}`, { interview })
      .then((resolve) => {
        const days = updateSpots(id, appointments);
        setState((prev) => ({
          ...prev,
          appointments,
          days,
        }));
      });
    //error handling/.catch is in index.js
  };

  const cancelInterview = function (id) {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    return axios.delete(`/api/appointments/${id}`).then((resolve) => {
      const days = updateSpots(id, appointments);
      setState((prev) => ({
        ...prev,
        appointments,
        days,
      }));
    });
    //error handling/.catch is in index.js
  };

  return { state, setDay, bookInterview, cancelInterview };
};

export default useApplicationHook;
