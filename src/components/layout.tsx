/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { useStaticQuery, graphql } from 'gatsby'
import Header from './header'
import './layout.scss'
import SocialMedia from './social_media'

//https://medium.com/@chrisfitkin/how-to-smooth-scroll-links-in-gatsby-3dc445299558
if (typeof window !== 'undefined') {
  // eslint-disable-next-line global-require
  require('smooth-scroll')('a[href*="#"]', { header: '#navbar' })
}

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  const handleFirstTab = event => {
    if (event.keyCode === 9) {
      const htmlElement = document.querySelector('html')
      htmlElement.classList.add('user-is-tabbing')
      window.removeEventListener('keydown', handleFirstTab)
      window.addEventListener('mousedown', handleMouseDownOnce)
    }
  }

  const handleMouseDownOnce = () => {
    const htmlElement = document.querySelector('html')
    htmlElement.classList.remove('user-is-tabbing')
    window.removeEventListener('mousedown', handleMouseDownOnce)
    window.addEventListener('keydown', handleFirstTab)
  }

  useEffect(() => {
    window.addEventListener('keydown', handleFirstTab)
    const body = document.body
    localStorage.getItem('darkMode') === 'false'
      ? body.classList.add('light')
      : body.classList.add('dark')
  })

  return (
    <>
      <Header siteTitle={data.site.siteMetadata.title}></Header>
      <div className="layout">
        <main>{children}</main>
        <footer className="footer-container">
          <SocialMedia />
          <p>
            <a href="https://github.com/BrChung/ModernFolio">
              Developed and Designed by Brian Chung
            </a>
          </p>
          <small>
            Copyright © {new Date().getFullYear()} Brian Chung. All Rights
            Reserved.
          </small>
        </footer>
      </div>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
