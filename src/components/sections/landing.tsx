import React from "react"
import PropTypes from "prop-types"
import HoneycombBG from "../../assets/honeycomb_bg"
import "./landing.scss"

const Landing = ({ data }) => {
  const { frontmatter, excerpt } = data[0].node
  return (
    <div className="landing-container">
      <div className="honeycomb-bg">
        <HoneycombBG></HoneycombBG>
      </div>
      <span className="introduction">{frontmatter.intro}</span>
      <br />
      <span className="title">{frontmatter.name}.</span>
      <br />
      <span className="title">{frontmatter.title}</span>
      <br />
      <span className="description">{excerpt}</span>
    </div>
  )
}

Landing.propTypes = {
  data: PropTypes.array.isRequired,
}

export default Landing
