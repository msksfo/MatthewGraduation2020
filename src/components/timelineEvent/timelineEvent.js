import React from "react"
import timelineEventStyles from "./timelineEvent.module.css"

const TimelineEvent = props => {
  return (
    <li className={timelineEventStyles.timelineEventWrapper}>
      <p className={timelineEventStyles.timelineEventDate}>{props.date}</p>
      <div className={timelineEventStyles.timelineEventTextWrapper}>
        <p className={timelineEventStyles.timelineEventTitle}>{props.title}</p>
        <figure>
          <img src={props.imageUrl} alt={props.imageAlt} />
          <figcaption className={timelineEventStyles.eventDescription}>
            {props.description}
          </figcaption>
        </figure>
      </div>
    </li>
  )
}

export default TimelineEvent
