import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import Img from "gatsby-image"
import GitHubIcon from "../../icons/github"
import "./projects.scss"

const Projects = ({ data }) => {
  const [windowWidth, setWindowWidth] = useState(null)

  const updateWindowSize = () => {
    setWindowWidth(window.innerWidth)
  }

  useEffect(() => {
    window.addEventListener("resize", updateWindowSize)
    updateWindowSize()
  }, [])

  return (
    <section className="projects-container" id="projects">
      <h3 className="projects-container-title">Projects I've Developed</h3>
      <div>
        {data &&
          data.map(({ node }, i) => {
            const { frontmatter, html } = node
            const {
              demo,
              title,
              technologies,
              github,
              cover_img,
              demo_gif,
            } = frontmatter

            const [showGif, setShowGif] = useState(false)

            return (
              <div className="project" key={i}>
                <div className="project-content">
                  <h4 className="project-title">
                    {demo ? (
                      <a
                        href={demo}
                        target="_blank"
                        rel="nofollow noopener noreferrer"
                        aria-label="External Link"
                      >
                        {title}
                      </a>
                    ) : (
                      title
                    )}
                  </h4>
                  <div
                    className="project-description"
                    dangerouslySetInnerHTML={{ __html: html }}
                  />
                  {technologies && (
                    <ul className="project-technologies">
                      {technologies.map((tech, i) => (
                        <li key={i}>{tech}</li>
                      ))}
                    </ul>
                  )}
                  <div className="project-link-container">
                    {github && (
                      <a
                        href={github}
                        target="_blank"
                        rel="nofollow noopener noreferrer"
                        aria-label="GitHub Link"
                      >
                        <GitHubIcon />
                      </a>
                    )}
                    {demo && (
                      <a
                        href={demo}
                        target="_blank"
                        rel="nofollow noopener noreferrer"
                        aria-label="Demo Link"
                      >
                        <GitHubIcon />
                      </a>
                    )}
                  </div>
                </div>

                <a
                  className="project-image-container"
                  href={demo ? demo : github ? github : "#"}
                  target="_blank"
                  rel="nofollow noopener noreferrer"
                  onMouseOver={() => {
                    setShowGif(true)
                  }}
                  onMouseLeave={() => {
                    setShowGif(false)
                  }}
                >
                  <Img
                    className="project-cover-image"
                    fluid={cover_img.childImageSharp.fluid}
                    alt={title}
                  />
                  {windowWidth >= 768 && showGif && demo_gif && (
                    <img
                      src={demo_gif}
                      alt={title}
                      className="project-cover-gif"
                    />
                  )}
                </a>
              </div>
            )
          })}
      </div>
    </section>
  )
}

Projects.propTypes = {
  data: PropTypes.array.isRequired,
}

export default Projects
