import React from "react"
import PropTypes from "prop-types"
import Img from "gatsby-image"
import "./background.scss"

const About_Background = ({ data }) => {
  const { frontmatter, html } = data[0].node
  return (
    <div className="background-container">
      <Img
        className="background-profile-image"
        fluid={frontmatter.profile_image.childImageSharp.fluid}
        alt="Avatar"
      />
      <div
        className="background-content-container"
        dangerouslySetInnerHTML={{ __html: html }}
      ></div>
    </div>
  )
}

About_Background.propTypes = {
  data: PropTypes.array.isRequired,
}

export default About_Background
