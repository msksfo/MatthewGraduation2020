import React from "react"
import ifEmoji from "if-emoji"
import Layout from "../components/layout/layout"
import sendMoneyStyles from "../styles/sendmoney.module.css"

const SendMoney = props => {
  let moneyFace = ifEmoji("🤑")
  return (
    <Layout>
      <div className={sendMoneyStyles.contentWrapper}>
        <div className={sendMoneyStyles.text}>
          {" "}
          <p>
            thankyouthankyouthankyouthankyou{" "}
            <span role="img" aria-label="right arrow emoji">
              &#128073;
            </span>{" "}
            <a
              className={sendMoneyStyles.paypalLink}
              href="https://www.paypal.me/MFE5150"
              target="_blank"
              rel="noopener noreferrer"
            >
              paypal{" "}
              {moneyFace ? (
                <span
                  role="img"
                  aria-label="money eyes emoji"
                  className={sendMoneyStyles.moneyEmoji}
                >
                  &#129297;
                </span>
              ) : (
                ""
              )}
            </a>
          </p>
        </div>{" "}
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path
            fill="#ffffff"
            //fill-opacity="1"
            d="M0,128L48,149.3C96,171,192,213,288,202.7C384,192,480,128,576,106.7C672,85,768,107,864,138.7C960,171,1056,213,1152,192C1248,171,1344,85,1392,42.7L1440,0L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
          ></path>
        </svg>
      </div>
    </Layout>
  )
}

export default SendMoney
