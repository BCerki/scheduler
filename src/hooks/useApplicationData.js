//FIXFIX if you don't selevt interterviewer, error

import React, { useState, useEffect } from "react";
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
  const updateSpots = function (id) {
    let dayName = null;
    let apptArray = [];
    let spotsArray = [];
    let dayObject = {};

    for (const element of state.days) {
      if (element.appointments.includes(id)) {
        //Figure out which day the input appointment is on (using the appt id)
        dayName = element.name
        //Get an array that contains all the appointment ids for that day
        apptArray = [...element.appointments]
        dayObject = { ...element };
      }
    }
    // console.log('dayObject', dayObject)

    //they're in order, so maybe you could do this with math instead
    //Grab the appointment details from state for each other appts in the day's array
    for (const element of apptArray) {
      if (element === state.appointments[element].id) {
        spotsArray.push(state.appointments[element].interview)
      }
    }

    //If the appointment details are null, it means there's no appointment booked, so get a count of how many nulls are in the day
    const spotsRemaining = spotsArray.filter(interview => interview === null).length;

    // const updatedDay = {
    //   ...dayObject,
    //   spots: spotsRemaining
    // }
    // console.log('updatedDayObject', updatedDay)

    // const updatedDays = [...state.days]

    // console.log('updatedDays before', updatedDays)
    // //use the numbers minus 1 to get the array index
    // updatedDays[id - 1] = updatedDay;

    // console.log('updatedDays after', updatedDays)

    console.log('state', state)
    return spotsRemaining;
  };

  //interview manipulation functions
  const bookInterview = function (id, interview) {
    // console.log('id:', id, 'interview:', interview);

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
        updateSpots(1);
        setState({
          ...state,
          appointments
        })
      })
    // .catch(err => console.log('Error:', err.message))
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
        setState({
          ...state,
          appointments
        })
      })
    // .catch(err => {
    //   console.log('Error:', err.message)
    // })
  };


  return { state, setDay, bookInterview, cancelInterview };
}

export default useApplicationHook;
