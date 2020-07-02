import React from "react"
import PropTypes from "prop-types"
import ProfileImage from "../../assets/profile_image"
import Image from "../../components/image"
import "./about.scss"

const About = ({ data }) => {
  const { frontmatter, html } = data[0].node
  return (
    <div>
      <div className="about-container">
        <span className="introduction">{frontmatter.intro}</span>
        <br />
        <span className="title">{frontmatter.title}</span>
        <br />
        <div dangerouslySetInnerHTML={{ __html: html }}></div>
      </div>
      <div style={{ maxWidth: `512px`, marginBottom: `1.45rem` }}>
        <ProfileImage />
      </div>
    </div>
  )
}

About.propTypes = {
  data: PropTypes.array.isRequired,
}

export default About
