import React, { useState, useEffect } from "react";
import axios from 'axios';

const useApplicationHook = function () {

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
