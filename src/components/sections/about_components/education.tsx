import React from "react"
import PropTypes from "prop-types"
import Img from "gatsby-image"
import SchoolIcon from "../../../icons/school"
import "./education.scss"

const About_Education = ({ data }) => (
  <div className="education-container">
    <h4 className="education-title">
      <SchoolIcon />
      <span>Education</span>
    </h4>
    <div className="education-content-container">
      <div>
        {data &&
          data.map(({ node }, index: number) => {
            const { frontmatter } = node
            const { title, school_image, degree, major, range } = frontmatter
            return (
              <div className="education-list-item" key={index}>
                <Img
                  className="education-school-image"
                  fluid={school_image.childImageSharp.fluid}
                  alt={title}
                  draggable={false}
                />
                <div className="education-school-content">
                  <h5 className="education-school-name">
                    <span>{title}</span>
                  </h5>
                  <span className="education-degree-major">
                    {degree} - {major}
                  </span>
                  <br />
                  <span className="education-date-range">{range}</span>
                </div>
              </div>
            )
          })}
      </div>
    </div>
  </div>
)

About_Education.propTypes = {
  data: PropTypes.array.isRequired,
}

export default About_Education
