import React from "react"
import footerStyles from "../footer/footer.module.css"

const Footer = () => {
  return (
    <footer className={footerStyles.footer}>
      <small>
        {" "}
        © {new Date().getFullYear()}
        {` `}
        <a
          href="https://tangoechodesign.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          TangoEcho Design
        </a>
        . All Rights Reserved
      </small>
    </footer>
  )
}

export default Footer
