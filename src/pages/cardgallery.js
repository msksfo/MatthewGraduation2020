import React from "react"
import Head from "../components/head"
import { useStaticQuery, graphql } from "gatsby"

import Layout from "../components/layout/layout"
import cardGalleryStyles from "../styles/cardGallery.module.css"

function CardGallery() {
  // * i need state in this component. when a card is added, state changes and this component should be rerendered with the new card

  const data = useStaticQuery(graphql`
    query CloudinaryImages {
      allCloudinaryMedia {
        edges {
          node {
            secure_url
          }
        }
      }
    }
  `)

  const cloudinaryImages = data.allCloudinaryMedia.edges

  return (
    <Layout>
      <Head title="Card Gallery" />
      <div className={cardGalleryStyles.contentWrapper}>
        <div className={cardGalleryStyles.cardGrid}>
          {cloudinaryImages.map((image, idx) => (
            <img
              className={cardGalleryStyles.card}
              key={idx}
              src={image.node.secure_url}
              alt={"Congratulations card for Matthew"}
            />
          ))}
        </div>
      </div>
    </Layout>
  )
}

export default CardGallery
