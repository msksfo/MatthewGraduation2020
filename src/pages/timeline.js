import React from "react"
import Layout from "../components/layout/layout"
import timelineStyles from "../styles/timeline.module.css"

import matthew1 from "../images/matthew1.jpg"
import matthewGraduates from "../images/matthewcopy.jpg"

// cool timeline inspired by https://codepen.io/Fischaela/pen/sJdqg
function Timeline() {
  return (
    <Layout>
      <section className={timelineStyles.contentWrapper}>
        <h1>This is my life</h1>
        <ul className={timelineStyles.timelineList}>
          <li className={timelineStyles.timelineEventWrapper}>
            <p className={timelineStyles.timelineEventDate}>September 2001</p>
            <div className={timelineStyles.timelineEventTextWrapper}>
              <p className={timelineStyles.timelineEventTitle}>I was born!</p>
              <figure>
                <img src={matthew1} alt="" />
                <figcaption className={timelineStyles.eventDescription}>
                  description of event/photo
                </figcaption>
              </figure>
            </div>
          </li>

          {/*  make each li into a component??? */}
          <li className={timelineStyles.timelineEventWrapper}>
            <p className={timelineStyles.timelineEventDate}>September 2001</p>
            <div className={timelineStyles.timelineEventTextWrapper}>
              <p className={timelineStyles.timelineEventTitle}>I was born!</p>
              <figure>
                <img src={matthew1} alt="" />
                <figcaption className={timelineStyles.eventDescription}>
                  description of event/photo
                </figcaption>
              </figure>
            </div>
          </li>

          <li className={timelineStyles.timelineEventWrapper}>
            <p className={timelineStyles.timelineEventDate}>June 2020</p>
            <div className={timelineStyles.timelineEventTextWrapper}>
              <p className={timelineStyles.timelineEventTitle}>
                I graduated from high school!
              </p>
              <figure>
                <img src={matthewGraduates} alt="" />
                <figcaption className={timelineStyles.eventDescription}>
                  One journey ends. Another begins.
                </figcaption>
              </figure>
            </div>
          </li>
        </ul>
      </section>
    </Layout>
  )
}

export default Timeline
