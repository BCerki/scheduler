//FIXFIX if you don't selevt interterviewer, error

import React, { useState, useEffect, useCallback } from "react";
import axios from 'axios';

const useApplicationHook = function () {
  //State updates
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  })
  const setDay = day => setState({ ...state, day });

  //Custom hook
  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ])
      .then(all => {
        setState(prev => ({
          ...prev,
          days: all[0].data,
          appointments: all[1].data,
          interviewers: all[2].data
        }))

      });
  }, [])


  //spots updating

  const updateSpots = function (id, appointments) {
    //make a copy of the day object that the id belongs to
    const dayCopy = state.days.find(day => day.appointments.includes(id));

    const appointmentsInDay = dayCopy.appointments;

    //sum the number of interviews that are null (if interview is null, the spot is open)
    const spotsRemaining = appointmentsInDay.reduce((tally, appt) => {
      if (!appointments[appt].interview) {
        tally++;
      }
      return tally;
    }, 0);
    // console.log('spotsRemaining', spotsRemaining);

    //add the spotsRemaining to the copied day object
    dayCopy.spots = spotsRemaining;

    //copy the days array
    const daysCopy = [...state.days];

    //add the updated day obj to the copied days array
    const updatedDays = daysCopy.map(day => day.id === dayCopy.id ? dayCopy : day);

    // console.log('updatedDays', updatedDays)
    // console.log('state.days (to confirm no mutation', state.days)
    return updatedDays;

  };

  ////THIS VERSION HAS STATE ISSUE
  // const updateSpots = function (id, state) {
  //   //grab the appointments array that the id belongs to
  //   const dayCopy = state.days.find(day => day.appointments.includes(id));

  //   const appointmentsInDay = dayCopy.appointments;

  //   //count how many interviews are null (meaning the spot is available)
  //   //do this better with reduce FIXFIX
  //   let spotsRemaining = 0;
  //   const nullArray = appointmentsInDay.map(appt => {
  //     if (!state.appointments[appt].interview) {
  //       spotsRemaining++;
  //     }
  //   });

  //   //add the spotsRemaining to the copied day object
  //   dayCopy.spots = spotsRemaining;

  //   //copy the days array
  //   const daysCopy = [...state.days];

  //   //add the updated day obj to the copied days array
  //   const updatedDays = daysCopy.map(element => element.id === dayCopy.id ? dayCopy : element);

  //   return updatedDays;

  // };


  //interview manipulation functions
  const bookInterview = function (id, interview) {

    //Create variables with new interview info to ultimately be used to change state
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.put(`/api/appointments/${id}`, { interview })
      .then(resolve => {
        const days = updateSpots(id, appointments);
        setState(prev => ({
          ...prev,
          appointments,
          days
        }))
      })

    //catch will be handled elsewhere

  };

  const cancelInterview = function (id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };




    return axios.delete(`/api/appointments/${id}`)
      .then(resolve => {
        const days = updateSpots(id, appointments);
        setState(prev => ({
          ...prev,
          appointments,
          days
        }))
      })
    //catch will be handled elsewhere
  };

  return { state, setDay, bookInterview, cancelInterview };
}

export default useApplicationHook;
