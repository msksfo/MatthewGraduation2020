/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import { Link } from "gatsby"
//import PropTypes from "prop-types"
//import { useStaticQuery, graphql } from "gatsby"

import Header from "../header/header"
import Footer from "../footer/footer"
import layoutStyles from "../layout/layout.module.css"

const Layout = ({ children }) => {
  return (
    <div className={layoutStyles.layoutWrapper}>
      <Link to="/" className={layoutStyles.initialsLinkToHome}>
        M E
      </Link>
      <Header />

      <main className={layoutStyles.main}>{children}</main>

      <Footer />
    </div>
  )
}

export default Layout
