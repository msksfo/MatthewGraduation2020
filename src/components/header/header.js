import { Link } from "gatsby"

import React from "react"
import headerStyles from "../header/header.module.css"

const Header = () => (
  <header className={headerStyles.header}>
    <nav>
      <ul className={headerStyles.navList}>
        <li className={headerStyles.navItem}>
          <Link to="/timeline" className={headerStyles.navLink}>
            the journey
          </Link>
        </li>
        <li className={headerStyles.navItem}>
          <Link to="/cardgallery" className={headerStyles.navLink}>
            card gallery
          </Link>
        </li>
      </ul>
    </nav>{" "}
  </header>
)

export default Header
