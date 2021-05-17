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
    //this could be a helper function
    //pass in dayName, days, appointments
    let dayName = null;
    let apptArray = [];
    let spotsArray = [];
    let dayObject = {};
    let dayId = null;

    //use .find to get the whole thing
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


    //try to use reduce to calculate?


    //they're in order, so maybe you could do this with math instead
    //Grab the appointment details from state for each other appts in the day's array
    for (const element of apptArray) {
      if (element === state.appointments[element].id) {
        spotsArray.push(state.appointments[element].interview)
      }
    }

    //If the appointment details are null, it means there's no appointment booked, so get a count of how many nulls are in the day (BEFORE the new booking/deletion happens)
    const spotsRemaining = spotsArray.filter(interview => interview === null).length;

    return { spotsRemaining, dayId };
    //around 19min
    // 23:57 is the map for days
    //(day => day.name === day.name === dayName ? newDay : day)
  };


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

    //Create variables with new spot number info to ultimately be used to change state
    const { spotsRemaining, dayId } = updateSpots(id);

    const day = {
      //grab the single day index number by subtracting 1
      ...state.days[dayId - 1],
      spots: spotsRemaining - 1
    };


    const days = [...state.days]
    days[dayId - 1] = day;


    return axios.put(`/api/appointments/${id}`, { interview })
      .then(resolve => {
        setState({
          ...state,
          appointments,

          days
        })
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

    //Create variables with new spot number info to ultimately be used to change state
    const { spotsRemaining, dayId } = updateSpots(id);

    const day = {
      //grab the single day index number by subtracting 1
      ...state.days[dayId - 1],
      spots: spotsRemaining + 1
    };

    const days = [...state.days]
    days[dayId - 1] = day;


    return axios.delete(`/api/appointments/${id}`)
      .then(resolve => {
        setState({
          ...state,
          appointments,
          days
        })
      })
    //catch will be handled elsewhere
  };

  return { state, setDay, bookInterview, cancelInterview };
}

export default useApplicationHook;
