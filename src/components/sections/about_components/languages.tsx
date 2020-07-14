import React from "react"
import PropTypes from "prop-types"
import CodeIcon from "../../../icons/code"
import Proficiency_Rating from "../../../assets/proficiency_rating"
import "./languages.scss"

const About_Languages = ({ data }) => (
  <div className="languages-container">
    <h4 className="languages-title">
      <CodeIcon />
      <span>Languages</span>
    </h4>
    {data &&
      data.map(({ node }, index: number) => {
        const { frontmatter } = node
        const { title, percentage, proficiency } = frontmatter
        return (
          <div className="language-list-item" key={index}>
            <div>
              <h5 className="language-name">
                <span>{title}</span>
              </h5>
              <span className="language-proficiency">{proficiency}</span>
            </div>
            <Proficiency_Rating percentage={percentage} />
          </div>
        )
      })}
  </div>
)

About_Languages.propTypes = {
  data: PropTypes.array.isRequired,
}

export default About_Languages
