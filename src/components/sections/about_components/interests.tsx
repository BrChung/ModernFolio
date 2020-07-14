import React from "react"
import PropTypes from "prop-types"
import Img from "gatsby-image"
import "./interests.scss"

const About_Interests = ({ data }) => {
  const { frontmatter, html } = data[0].node
  const { cover_image, cover_image_alt, cover_image_caption } = frontmatter
  return (
    <div className="interests-container">
      <Img
        className="interests-cover-image"
        fluid={cover_image.childImageSharp.fluid}
        alt={cover_image_alt}
      />
      <p className="interests-image-caption">{cover_image_caption}</p>
      <h4 className="interests-title">My Interests</h4>
      <div
        className="interests-content-container"
        dangerouslySetInnerHTML={{ __html: html }}
      ></div>
    </div>
  )
}

About_Interests.propTypes = {
  data: PropTypes.array.isRequired,
}

export default About_Interests
