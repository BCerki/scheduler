//Import axois, React, and helper functions
import axios from 'axios';
import React, { useState, useEffect } from "react";
import { getAppointmentsForDay } from "helpers/selectors";

//Import components
import DayListItem from "components/DayListItem";
import DayList from "components/DayList";
import Appointment from "components/Appointment";


//Import styles
import "components/Application.scss";



//Application component
export default function Application() {

  // const [day, setDay] = useState([]);
  // const [days, setDays] = useState([]);

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  })

  const dailyAppointments = getAppointmentsForDay(state, state.day);

  //functions to update state
  const setDay = day => setState({ ...state, day });
  // const setDays = days => setState(prev => ({ ...prev, days }));


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
          appointments: all[1].data
        }))
        // console.log(response.data)
        // setDays(response.data)
      });
  }, [])



  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            day={state.day}
            setDay={setDay} //this also seemed to work? setDay={day => setDay(day)}
          />

        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {dailyAppointments.map(appointment => {
          return <Appointment
            key={appointment.id}
            {...appointment}
          />
        })
        }
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
