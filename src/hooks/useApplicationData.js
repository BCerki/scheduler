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
    let dayId = null;

    for (const element of state.days) {
      //Figure out which day the input appointment is on (using the appt id)
      if (element.appointments.includes(id)) {
        //Save some references in variables to use later
        dayName = element.name
        dayId = element.id;
        //Get an array that contains all the appointment ids for that day
        apptArray = [...element.appointments]
        dayObject = { ...element };
      }
    }

    //they're in order, so maybe you could do this with math instead
    //Grab the appointment details from state for each other appts in the day's array
    for (const element of apptArray) {
      if (element === state.appointments[element].id) {
        spotsArray.push(state.appointments[element].interview)
      }
    }

    //If the appointment details are null, it means there's no appointment booked, so get a count of how many nulls are in the day

    //this is the issue--the count happens before the deletion FIXFIX
    const spotsRemaining = spotsArray.filter(interview => interview === null).length;

    console.log('spotsRemaining', spotsRemaining)


    //copy the book interview workflow
    const day = {
      //grab the single day index number by subtracting 1
      ...state.days[dayId - 1],
      spots: spotsRemaining
    };

    // copy days from state
    const days = [...state.days]

    //update the relevant value
    days[dayId - 1] = day;

    return days;
  };
  console.log('state', state)

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

    const days = updateSpots(id);
    console.log('days in bookinterview', days)

    return axios.put(`/api/appointments/${id}`, { interview })
      .then(resolve => {
        setState({
          ...state,
          appointments,
          //FIXFISstate changes, but no render
          days
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

    const days = updateSpots(id);
    console.log('day in cancelinterview', days)

    return axios.delete(`/api/appointments/${id}`)
      .then(resolve => {
        setState({
          ...state,
          appointments,
          days
        })
      })
    // .catch(err => {
    //   console.log('Error:', err.message)
    // })
  };


  return { state, setDay, bookInterview, cancelInterview };
}

export default useApplicationHook;
