import { useEffect, useState } from 'react';
import axios from "axios";

export default function useApplicationData() {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  useEffect(() => {
    Promise.all([
      axios.get(`/api/days`),
      axios.get(`/api/appointments`),
      axios.get(`/api/interviewers`),
    ]).then((all) => {
      setState((prev) => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      }));
    });
  }, []);

  const setDay = (day) => setState((prevState) => ({ ...prevState, day }));

  const updateSpots = (dayName, appointments) => {
    const day = state.days.find((d) => d.name === dayName);
    if (!day) return;

    const spots = day.appointments.reduce(
      (acc, appointmentId) => (!appointments[appointmentId].interview ? acc + 1 : acc),
      0
    );

    const updatedDays = state.days.map((d) =>
      d.name === dayName ? { ...d, spots } : d
    );

    setState((prev) => ({
      ...prev,
      days: updatedDays,
    }));
  };

    function bookInterview(id, interview) {
      const appointment = {
        ...state.appointments[id],
        interview: { ...interview }
      };

      const appointments = {
        ...state.appointments,
        [id]: appointment
      };

      return axios
        .put(`/api/appointments/${id}`, { interview })
        .then((response) => {
          setState((prev) => ({ ...prev, appointments }));
          updateSpots(state.day, appointments);
        });
    };

    function cancelInterview(id) {
      const appointment = {
        ...state.appointments[id],
        interview: null,
      };
      const appointments = {
        ...state.appointments,
        [id]: appointment,
      };
      return axios.delete(`/api/appointments/${id}`, null).then((response) => {
        setState((prev) => ({ ...prev, appointments }));
        updateSpots(state.day, appointments);
      });
    }

    return { state, setDay, bookInterview, cancelInterview };
  }