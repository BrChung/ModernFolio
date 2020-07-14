import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import GitHubIcon from "../icons/github"
import LinkedInIcon from "../icons/linkedin"
import InstagramIcon from "../icons/instagram"
import TwitterIcon from "../icons/twitter"
import "./social_media.scss"

const SocialMedia = () => {
  const data = useStaticQuery(graphql`
    query SocialMediaQuery {
      allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/social_media/" } }
      ) {
        edges {
          node {
            frontmatter {
              github
              linkedin
              instagram
              twitter
            }
          }
        }
      }
    }
  `)
  const {
    github,
    instagram,
    linkedin,
    twitter,
  } = data.allMarkdownRemark.edges[0].node.frontmatter
  return (
    <div className="social-media-container">
      <a href={github}>
        <GitHubIcon />
      </a>
      <a href={linkedin}>
        <LinkedInIcon />
      </a>
      <a href={instagram}>
        <InstagramIcon />
      </a>
      <a href={twitter}>
        <TwitterIcon />
      </a>
    </div>
  )
}

export default SocialMedia
