import React from 'react';
import InterviewerListItem from './InterviewerListItem';
import "components/InterviewerList.scss";

export default function InterviewerList(props) {
  const interviewerItems = Object.keys(props.interviewers).map((key) => (
    <InterviewerListItem
      key={props.interviewers[key].id}
      name={props.interviewers[key].name}
      avatar={props.interviewers[key].avatar}
      selected={props.interviewers[key].id === props.value}
      setInterviewer={() => props.onChange(props.interviewers[key].id)}
    />
  ));

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{interviewerItems}</ul>
    </section>
  );
}