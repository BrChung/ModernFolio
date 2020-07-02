import React from "react"
import PropTypes from "prop-types"
import "./landing.scss"

const Sidebar = ({ data }) => {
  const { frontmatter, excerpt } = data[0].node
  return (
    <div className="sidebar-container">
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

Sidebar.propTypes = {
  data: PropTypes.array.isRequired,
}

export default Sidebar
