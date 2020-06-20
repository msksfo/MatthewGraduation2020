import React from "react"
import Head from "../components/head"
import { useStaticQuery, graphql } from "gatsby"

import Layout from "../components/layout/layout"
import cardGalleryStyles from "../styles/cardGallery.module.css"

function CardGallery() {
  const data = useStaticQuery(graphql`
    query CloudinaryImages {
      allCloudinaryMedia(sort: { fields: created_at, order: DESC }) {
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
