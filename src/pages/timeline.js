import React from "react"
import Head from "../components/head"
import Layout from "../components/layout/layout"
import TimelineEvent from "../components/timelineEvent/timelineEvent"
import timelineStyles from "../styles/timeline.module.css"
import timelineData from "../data.json"

// cool timeline inspired by https://codepen.io/Fischaela/pen/sJdqg
function Timeline() {
  return (
    <Layout>
      <Head title="The Journey" />
      <section className={timelineStyles.contentWrapper}>
        <h1>This is my life</h1>
        <ul className={timelineStyles.timelineList}>
          {timelineData.map(value => {
            return (
              <TimelineEvent
                key={value.title}
                date={value.date}
                title={value.title}
                description={value.description}
                imageUrl={value.imageUrl}
                imageAlt={value.imageAlt}
              />
            )
          })}
        </ul>
      </section>
    </Layout>
  )
}

export default Timeline
