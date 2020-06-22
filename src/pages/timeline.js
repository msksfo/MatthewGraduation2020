import React, { useState } from "react"

import Head from "../components/head"
import Layout from "../components/layout/layout"
import TimelineEvent from "../components/timelineEvent/timelineEvent"
import timelineStyles from "../styles/timeline.module.css"

import timelineData from "../data.json"

import birth from "../images/timeline/birth.jpg"
import walking from "../images/timeline/walking.jpg"
import withCalista from "../images/timeline/withCalista.jpg"
import wedding from "../images/timeline/wedding.jpg"
import withRhi from "../images/timeline/withRhi.jpg"
import withKekoa from "../images/timeline/withKekoa.jpg"
import elementaryGrad from "../images/timeline/elementaryGrad.jpg"
import flying from "../images/timeline/flying.jpg"
import band from "../images/timeline/band.jpg"
import drumline from "../images/timeline/drumline.jpg"
import military from "../images/timeline/military.jpg"
import matthewcopy from "../images/timeline/matthewcopy.jpg"

// cool timeline inspired by https://codepen.io/Fischaela/pen/sJdqg
const Timeline = () => {
  let images = [
    "",
    birth,
    walking,
    withCalista,
    wedding,
    withRhi,
    withKekoa,
    elementaryGrad,
    flying,
    band,
    drumline,
    military,
    matthewcopy,
  ]

  return (
    <Layout>
      <Head title="The Journey" />
      <section className={timelineStyles.contentWrapper}>
        <h1>This is my life</h1>
        <ul className={timelineStyles.timelineList}>
          {timelineData.map(value => {
            images = images.slice(1)
            return (
              <TimelineEvent
                key={value.title}
                date={value.date}
                title={value.title}
                description={value.description}
                imageUrl={images[0]}
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
