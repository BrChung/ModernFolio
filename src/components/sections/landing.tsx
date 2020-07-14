import React from "react"
import PropTypes from "prop-types"
import HoneycombBG from "../../assets/honeycomb_bg"
import "./landing.scss"

const Landing = ({ data }) => {
  const { frontmatter, excerpt } = data[0].node
  return (
    <section className="landing-container">
      <div className="honeycomb-bg">
        <HoneycombBG></HoneycombBG>
      </div>
      <div className="landing-content-container">
        <div className="landing-content-flex">
          <span className="landing-introduction">{frontmatter.intro}</span>
          <br />
          <h1>
            <span className="landing-title">{frontmatter.name}.</span>
          </h1>
          <br />
          <h2>
            <span className="landing-position">{frontmatter.title}</span>
          </h2>
          <br />
          <span className="landing-description">{excerpt}</span>
        </div>
      </div>
    </section>
  )
}

Landing.propTypes = {
  data: PropTypes.array.isRequired,
}

export default Landing
