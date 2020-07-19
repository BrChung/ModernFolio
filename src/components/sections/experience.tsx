import React, { useState, useEffect, useRef } from "react"
import { CSSTransition } from "react-transition-group"
import PropTypes from "prop-types"
import "./experience.scss"

const Experience = ({ data }) => {
  const [activeExpId, setActiveExpId] = useState(0)
  const [expFocus, setExpFocus] = useState(null)
  const [windowWidth, setWindowWidth] = useState(null)
  const [contentHeight, setContentHeight] = useState(null)
  const expTabs = useRef([])
  const expContent = useRef([])

  const focusExp = () => {
    if (expTabs.current[expFocus]) expTabs.current[expFocus].focus()
    else if (expFocus < 0) setExpFocus(expTabs.current.length - 1)
    else if (expFocus >= expTabs.current.length) setExpFocus(0)
  }

  const updateWindowSize = () => {
    setWindowWidth(window.innerWidth)
  }

  const keyPressHandler = e => {
    if (e.keyCode === 40) {
      e.preventDefault()
      setExpFocus(expFocus + 1)
    } else if (e.keyCode === 38) {
      e.preventDefault()
      setExpFocus(expFocus - 1)
    }
  }

  const calcHeight = element => {
    const height = element.offsetHeight
    setContentHeight(height)
  }

  useEffect(() => focusExp(), [expFocus])

  useEffect(() => {
    window.addEventListener("resize", updateWindowSize)
    updateWindowSize()
    setContentHeight(expContent.current[0]?.firstChild.offsetHeight)
  }, [])

  return (
    <section className="experience-flex-container" id="experience">
      <div className="experience-container">
        <h3 className="experience-container-title">My Experience</h3>
        <div className="experience-tab-container">
          <ul
            className="experience-tab-list"
            role="tablist"
            aria-label="Job tabs"
            onKeyDown={e => keyPressHandler(e)}
          >
            {data &&
              data.map(({ node }, i) => {
                const { company } = node.frontmatter
                return (
                  <li key={i}>
                    <button
                      className="experience-tab-list-button"
                      style={
                        activeExpId === i
                          ? { backgroundColor: "var(--hover)" }
                          : { backgroundColor: "inherit" }
                      }
                      onClick={() => setActiveExpId(i)}
                      ref={el => (expTabs.current[i] = el)}
                      id={`tab-${i}`}
                      role="tab"
                      aria-selected={activeExpId === i ? true : false}
                      aria-controls={`panel-${i}`}
                      tabIndex={activeExpId === i ? 0 : -1}
                    >
                      <span>{company}</span>
                    </button>
                  </li>
                )
              })}
            {windowWidth < 768 && (
              <span
                className="experience-tab-list-highlight"
                style={{ transform: `translateX(${activeExpId * 120}px)` }}
              />
            )}
            {windowWidth >= 768 && (
              <span
                className="experience-tab-list-highlight"
                style={{ transform: `translateY(${activeExpId * 30}px)` }}
              />
            )}
          </ul>
          {data &&
            data.map(({ node }, i) => {
              const { frontmatter, html } = node
              const { title, url, company, range } = frontmatter
              return (
                <div
                  className="experience-tab-content-container"
                  id={`panel-${i}`}
                  role="tabpanel"
                  aria-labelledby={`tab-${i}`}
                  tabIndex={activeExpId === i ? 0 : -1}
                  hidden={activeExpId !== i}
                  ref={el => (expContent.current[i] = el)}
                  style={{ height: contentHeight }}
                  key={i}
                >
                  <CSSTransition
                    in={activeExpId === i}
                    unmountOnExit
                    timeout={500}
                    onEnter={calcHeight}
                  >
                    <div>
                      <h4 className="experience-title">
                        <span>{title}</span>
                        <span className="experience-company">
                          &nbsp;@&nbsp;
                        </span>
                        <a
                          href={url}
                          target="_blank"
                          rel="nofollow noopener noreferrer"
                          className="experience-company"
                        >
                          {company}
                        </a>
                      </h4>
                      <h5>
                        <span className="experience-details">{range}</span>
                      </h5>
                      <div
                        className="experience-description"
                        dangerouslySetInnerHTML={{ __html: html }}
                      />
                    </div>
                  </CSSTransition>
                </div>
              )
            })}
        </div>
      </div>
    </section>
  )
}

Experience.propTypes = {
  data: PropTypes.array.isRequired,
}

export default Experience
