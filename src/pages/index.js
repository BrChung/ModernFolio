import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"

import Landing from "../components/sections/landing"
import About from "../components/sections/about"

const IndexPage = ({ location, data }) => (
  <Layout>
    <SEO title="Home" />
    <Landing data={data.landing.edges} />
    <About data={data.about.edges} />
    <h1>Hi peps</h1>
    <p>Welcome to your new Gatsby site.</p>
    <p>Now go build something great.</p>
    <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
      <Image />
    </div>
    <Link to="/page-2/">Go to page 2</Link>
  </Layout>
)

export default IndexPage

export const pageQuery = graphql`
  {
    landing: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/landing/" } }
    ) {
      edges {
        node {
          frontmatter {
            intro
            name
            title
          }
          excerpt
        }
      }
    }
    about: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/about/" } }
    ) {
      edges {
        node {
          frontmatter {
            title
            profile_pic
            skills
          }
          html
        }
      }
    }
  }
`
