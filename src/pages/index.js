import React from "react"
import Head from "../components/head"
import { Link } from "gatsby"

import Layout from "../components/layout/layout"
import indexStyles from "../styles/index.module.css"

import matthew from "../images/matthewBlueRobe.jpg"

//import Image from "../components/image"
//import SEO from "../components/seo"

const IndexPage = () => (
  <Layout>
    <Head title="Home" />
    <div className={indexStyles.contentWrapper}>
      <div className={indexStyles.congrats}>
        <h1>
          <span className={indexStyles.congratulationsSpan}>
            Congratulations
          </span>{" "}
          <span className={indexStyles.matthewSpan}>Matthew</span>
        </h1>
        <div className={indexStyles.imageWrapper}>
          <img src={matthew} alt="" />
        </div>
      </div>

      <div className={indexStyles.ctaWrapper}>
        <Link to="/createcard" className={indexStyles.ctaButton}>
          Send Card
        </Link>
        <Link to="/sendmoney" className={indexStyles.ctaButton}>
          Send Money
        </Link>
      </div>
    </div>
  </Layout>
)

export default IndexPage
