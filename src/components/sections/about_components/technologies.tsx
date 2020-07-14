import React from "react"
import PropTypes from "prop-types"
import BuildIcon from "../../../icons/build"
import "./technologies.scss"

const About_Technologies = ({ data }) => {
  const { frontmatter } = data[0].node
  const { frameworks, tools, design } = frontmatter
  return (
    <div className="technologies-container">
      <h4 className="technologies-title">
        <BuildIcon />
        <span>Technologies</span>
      </h4>
      <h5 className="technologies-category">
        <span>Frameworks</span>
      </h5>
      {frameworks &&
        frameworks.map((framework: string, index: number) => {
          return (
            <span className="technology-list-item" key={index}>
              {framework}
            </span>
          )
        })}
      <h5 className="technologies-category">
        <span>Tools</span>
      </h5>
      {tools &&
        tools.map((tool: string, index: number) => {
          return (
            <span className="technology-list-item" key={index}>
              {tool}
            </span>
          )
        })}
      <h5 className="technologies-category">
        <span>Design</span>
      </h5>
      {design &&
        design.map((design: string, index: number) => {
          return (
            <span className="technology-list-item" key={index}>
              {design}
            </span>
          )
        })}
    </div>
  )
}

About_Technologies.propTypes = {
  data: PropTypes.array.isRequired,
}

export default About_Technologies
