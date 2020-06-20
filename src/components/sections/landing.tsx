import React from "react"
import { PageProps, Link } from "gatsby"
import "./landing.scss"

const Landing = ({ data }) => {
  const { frontmatter, excerpt } = data[0].node
  return (
    <div className="landing-container">
      <span className="introduction">{frontmatter.intro}</span>
      <br />
      <span className="title">{frontmatter.title}.</span>
      <br />
      <span>{excerpt}</span>
    </div>
  )
}

export default Landing
