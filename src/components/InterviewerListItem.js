import React from 'react';
import "components/InterviewerListItem.scss";

export default function InterviewerListItem(props) {
  return (
    <li
      className={`interviewers__item ${props.selected ? 'interviewers__item--selected' : ''}`}
      onClick={props.setInterviewer}
    >
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
      {props.selected && props.name}
    </li>
  );
}