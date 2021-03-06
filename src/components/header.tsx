import PropTypes from "prop-types"
import React, { useState, useEffect, useRef } from "react"
import { Link, useStaticQuery, graphql } from "gatsby"
import { CSSTransition } from "react-transition-group"
import ArrowLeftIcon from "../icons/arrow-left"
import CaretIcon from "../icons/caret"
import ChevronIcon from "../icons/chevron"
import UsersIcon from "../icons/users"
import GitHubIcon from "../icons/github"
import LinkedInIcon from "../icons/linkedin"
import InstagramIcon from "../icons/instagram"
import TwitterIcon from "../icons/twitter"
import PictureAsPDFIcon from "../icons/picrture_as_pdf"
import Brightness2Icon from "../icons/brightness_2"
import "./header.scss"

const Header = ({ siteTitle }) => (
  <header>
    <Navbar>
      <div>
        <h1>
          <Link to="/">{siteTitle}</Link>
        </h1>
      </div>
      <ul className="nav-elm-right-container">
        <li>
          <Link to="/#about">About</Link>
        </li>
        <li>
          <Link to="/#experience">Experience</Link>
        </li>
        <li>
          <Link to="/#projects">Projects</Link>
        </li>
        <li>
          <Link to="/#contact">Contact</Link>
        </li>
        <NavItem icon={<CaretIcon />}>
          <DropdownMenu></DropdownMenu>
        </NavItem>
      </ul>
    </Navbar>
  </header>
)

const Navbar = ({ children }) => (
  <nav id="navbar">
    <div className="navbar-elm"> {children}</div>
  </nav>
)

const NavItem = ({ icon, children }) => {
  const [open, setOpen] = useState(false)
  const NavItemRef = useRef()

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true)
    return () => {
      document.removeEventListener("click", handleClickOutside, true)
    }
  }, [])

  const handleClickOutside = event => {
    const domNode: any = NavItemRef.current
    if (!domNode || !domNode.contains(event.target)) {
      setOpen(false)
    }
  }

  return (
    <li className="nav-item" ref={NavItemRef}>
      <button
        className={open ? "icon-button-active" : "icon-button"}
        onClick={() => setOpen(!open)}
        aria-label="Dropdown Menu"
      >
        {icon}
      </button>

      {open && children}
    </li>
  )
}

const DropdownMenu = () => {
  const data = useStaticQuery(graphql`
    query SocialMediaHeaderQuery {
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
  const [activeMenu, setActiveMenu] = useState("main") //social-media
  const [menuHeight, setMenuHeight] = useState(null)
  const dropdownRef = useRef(null)

  useEffect(() => {
    setMenuHeight(dropdownRef.current?.firstChild.offsetHeight)
  }, [])

  const calcHeight = element => {
    const height = element.offsetHeight
    setMenuHeight(height)
  }

  const DropdownItem = ({
    leftIcon,
    rightIcon = undefined,
    children,
    goToMenu = undefined,
  }) => (
    <button
      className="menu-item"
      onClick={() => goToMenu && setActiveMenu(goToMenu)}
    >
      <span className="icon-button">{leftIcon}</span>
      {children}
      <span className="icon-right">{rightIcon}</span>
    </button>
  )

  const DropdownItemDarkMode = ({ leftIcon = undefined, children }) => {
    const [isChecked, setIsChecked] = useState(
      localStorage.getItem("darkMode") === "false" ? false : true
    )

    return (
      <button
        className="menu-item"
        onClick={() => {
          localStorage.setItem("darkMode", (!isChecked).toString())
          const body = document.body
          !isChecked
            ? body.classList.replace("light", "dark")
            : body.classList.replace("dark", "light")
          setIsChecked(!isChecked)
        }}
      >
        <span className="icon-button">{leftIcon}</span>
        {children}
        <div className="icon-right">
          <label className="switch">
            <input
              type="checkbox"
              onClick={event => {
                event.stopPropagation()
              }}
              checked={isChecked}
              readOnly
            />
            <span className="slider round"></span>
          </label>
        </div>
      </button>
    )
  }

  const DropdownTitle = ({ leftIcon, children, goToMenu }) => (
    <span className="menu-title">
      <button
        className="icon-button-no-background"
        onClick={() => goToMenu && setActiveMenu(goToMenu)}
      >
        {leftIcon}
      </button>
      <h1>{children}</h1>
    </span>
  )

  return (
    <div className="dropdown" style={{ height: menuHeight }} ref={dropdownRef}>
      <CSSTransition
        in={activeMenu === "main"}
        unmountOnExit
        timeout={500}
        classNames="menu-primary"
        onEnter={calcHeight}
      >
        <div className="menu">
          <a
            href="/resume.pdf"
            target="_blank"
            rel="nofollow noopener noreferrer"
          >
            <DropdownItem leftIcon={<PictureAsPDFIcon />}>Resume</DropdownItem>
          </a>
          <DropdownItem
            leftIcon={<UsersIcon />}
            rightIcon={<ChevronIcon />}
            goToMenu="social-media"
          >
            Social Media
          </DropdownItem>
          <DropdownItemDarkMode leftIcon={<Brightness2Icon />}>
            Dark Mode
          </DropdownItemDarkMode>
        </div>
      </CSSTransition>

      <CSSTransition
        in={activeMenu === "social-media"}
        unmountOnExit
        timeout={500}
        classNames="menu-secondary"
        onEnter={calcHeight}
      >
        <div className="menu">
          <DropdownTitle leftIcon={<ArrowLeftIcon />} goToMenu="main">
            Social Media
          </DropdownTitle>
          <a href={github} target="_blank" rel="nofollow noopener noreferrer">
            <DropdownItem leftIcon={<GitHubIcon />}> GitHub</DropdownItem>
          </a>
          <a href={linkedin} target="_blank" rel="nofollow noopener noreferrer">
            <DropdownItem leftIcon={<LinkedInIcon />}>LinkedIn</DropdownItem>
          </a>
          <a
            href={instagram}
            target="_blank"
            rel="nofollow noopener noreferrer"
          >
            <DropdownItem leftIcon={<InstagramIcon />}>Instagram</DropdownItem>
          </a>
          <a href={twitter} target="_blank" rel="nofollow noopener noreferrer">
            <DropdownItem leftIcon={<TwitterIcon />}>Twitter</DropdownItem>
          </a>
        </div>
      </CSSTransition>
    </div>
  )
}

NavItem.propTypes = {
  icon: PropTypes.element,
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
