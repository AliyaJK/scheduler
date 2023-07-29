export function getAppointmentsForDay(state, day) {
  const appointmentsArray = state.days
  .filter((days) => days.name === day)
  .map((obj) => obj.appointments);

if (appointmentsArray.length === 0) {
  return [];
}

const appointmentForDay = appointmentsArray[0].map((id) => {
  return state.appointments[id];
});

return appointmentForDay;
}

export function getInterview(state, interview) {
  if (!interview) {
    return null;
  }
  
  return {
    ...interview,
    interviewer: state.interviewers[interview.interviewer],
  };
  }

  export function getInterviewersForDay(state, day) {
    const dayObject = state.days.find((d) => d.name === day);
  
    if (!dayObject) {
      return [];
    }
  
    const interviewersForDay = dayObject.interviewers.map((id) => state.interviewers[id]);
  
    return interviewersForDay;
  }
  