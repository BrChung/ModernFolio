import React from "react"
import PropTypes from "prop-types"
import Img from "gatsby-image"
import VerifiedIcon from "../../../icons/verified"
import "./certification.scss"

const About_Certification = ({ data }) => (
  <div className="certification-container">
    <h4 className="certification-title">
      <VerifiedIcon />
      <span>Certifications</span>
    </h4>
    <div className="certification-content-container">
      <div>
        {data &&
          data.map(({ node }, index: number) => {
            const { frontmatter } = node
            const {
              title,
              certification_image,
              issuer,
              range,
              credential_url,
            } = frontmatter
            return (
              <div className="certification-list-item" key={index}>
                <Img
                  className="certification-certificate-image"
                  fluid={certification_image.childImageSharp.fluid}
                  alt={title}
                  draggable={false}
                />
                <div className="certification-certificate-content">
                  <h5 className="certification-certificate-name">
                    <a
                      href={credential_url}
                      target="_blank"
                      rel="nofollow noopener noreferrer"
                    >
                      <span>{title}</span>
                    </a>
                  </h5>
                  <span className="certification-issuer">{issuer}</span>
                  <br />
                  <span className="certification-date-range">{range}</span>
                </div>
              </div>
            )
          })}
      </div>
    </div>
  </div>
)

About_Certification.propTypes = {
  data: PropTypes.array.isRequired,
}

export default About_Certification
