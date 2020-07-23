import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/layout'
import SEO from '../components/seo'

import Landing from '../components/sections/landing'
import About from '../components/sections/about'
import Experience from '../components/sections/experience'
import Projects from '../components/sections/projects'
import Contact from '../components/sections/contact'

const IndexPage = ({ data }) => (
  <Layout>
    <SEO title="Software Engineer" />
    <Landing data={data.landing.edges} />
    <About
      about={data.about.edges}
      education={data.education.edges}
      languages={data.languages.edges}
      technologies={data.technologies.edges}
      certifications={data.certifications.edges}
      interests={data.interests.edges}
    />
    <Experience data={data.experience.edges} />
    <Projects data={data.projects.edges} />
    <Contact data={data.contact.edges} />
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
      filter: {
        fileAbsolutePath: { regex: "/about/" }
        frontmatter: { title: { eq: "about" } }
      }
    ) {
      edges {
        node {
          frontmatter {
            title
            profile_image {
              childImageSharp {
                fluid(maxWidth: 512, quality: 90) {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
          }
          html
        }
      }
    }
    education: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/education/" } }
    ) {
      edges {
        node {
          frontmatter {
            title
            school_image {
              childImageSharp {
                fluid(maxWidth: 42, quality: 90) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
            degree
            major
            range
          }
        }
      }
    }
    languages: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/languages/" } }
      sort: { fields: [frontmatter___percentage], order: DESC }
    ) {
      edges {
        node {
          frontmatter {
            title
            percentage
            proficiency
          }
        }
      }
    }
    technologies: allMarkdownRemark(
      filter: {
        fileAbsolutePath: { regex: "/about/" }
        frontmatter: { title: { eq: "technologies" } }
      }
    ) {
      edges {
        node {
          frontmatter {
            title
            frameworks
            tools
            design
          }
        }
      }
    }
    certifications: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/certifications/" } }
    ) {
      edges {
        node {
          frontmatter {
            title
            certification_image {
              childImageSharp {
                fluid(maxWidth: 42, quality: 90) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
            issuer
            range
            credential_url
          }
        }
      }
    }
    interests: allMarkdownRemark(
      filter: {
        fileAbsolutePath: { regex: "/about/" }
        frontmatter: { title: { eq: "interests" } }
      }
    ) {
      edges {
        node {
          frontmatter {
            title
            cover_image {
              childImageSharp {
                fluid(maxWidth: 768, quality: 90) {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
            cover_image_alt
            cover_image_caption
          }
          html
        }
      }
    }
    experience: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/experience/" } }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      edges {
        node {
          frontmatter {
            title
            company
            range
            url
          }
          html
        }
      }
    }
    projects: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/projects/" } }
      sort: { fields: [frontmatter___order] }
    ) {
      edges {
        node {
          frontmatter {
            title
            cover_img {
              childImageSharp {
                fluid(maxWidth: 700, quality: 90) {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
            demo_gif
            technologies
            github
            demo
          }
          html
        }
      }
    }
    contact: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/contact/" } }
    ) {
      edges {
        node {
          frontmatter {
            title
            message_placeholder
            submit_button_text
            snackbar_message
            error_message
          }
          html
        }
      }
    }
  }
`
