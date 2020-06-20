//import { Link } from "gatsby"
import PropTypes from "prop-types"
import React, { useState, useEffect, useRef } from "react"
import { Link } from "gatsby"
import { CSSTransition } from "react-transition-group"
import ArrowLeftIcon from "../icons/arrow-left.js"
import CaretIcon from "../icons/caret.js"
import CogIcon from "../icons/cog.js"
import ChevronIcon from "../icons/chevron.js"
import UsersIcon from "../icons/users"
import GitHubIcon from "../icons/github"
import LinkedInIcon from "../icons/linkedin"
import InstagramIcon from "../icons/instagram"
import TwitterIcon from "../icons/twitter"
import "./header.scss"

const Header = ({ siteTitle }) => (
  <header>
    <Navbar>
      <div
        style={{
          margin: `0 auto`,
          maxWidth: 960,
          padding: `1.45rem 1.0875rem`,
        }}
      >
        <h1 style={{ margin: 0 }}>
          <Link
            to="/"
            style={{
              color: `white`,
              textDecoration: `none`,
            }}
          >
            {siteTitle}
          </Link>
        </h1>
      </div>
      <div>
        <span>About</span>
        <span>Experience</span>
        <span>Projects</span>
        <span>Contact</span>
      </div>
      <NavItem icon={<CaretIcon />}>
        <DropdownMenu></DropdownMenu>
      </NavItem>
    </Navbar>
  </header>
)

const Navbar = ({ children }) => (
  <nav className="navbar">
    <ul className="navbar-elm"> {children}</ul>
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
    const domNode = NavItemRef.current

    if (!domNode || !domNode.contains(event.target)) {
      setOpen(false)
    }
  }

  return (
    //Prevent button focus on mouse click and allow button to be pressed on space key
    <li className="nav-item" ref={NavItemRef}>
      <button className="icon-button" onClick={() => setOpen(!open)}>
        {icon}
      </button>

      {open && children}
    </li>
  )
}

const DropdownMenu = () => {
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

  const DropdownItem = ({ leftIcon, rightIcon, children, goToMenu }) => (
    <a
      href="#"
      className="menu-item"
      onClick={() => goToMenu && setActiveMenu(goToMenu)}
    >
      <span className="icon-button">{leftIcon}</span>
      {children}
      <span className="icon-right">{rightIcon}</span>
    </a>
  )

  const DropdownItemDarkMode = ({ leftIcon, children }) => {
    const [isChecked, setIsChecked] = useState(
      localStorage.getItem("darkMode") === "true" ? true : false
    )

    return (
      <div
        className="menu-item"
        onClick={() => {
          localStorage.setItem("darkMode", !isChecked)
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
      </div>
    )
  }

  const DropdownTitle = ({ leftIcon, children, goToMenu }) => (
    <span className="menu-title">
      <a
        className="icon-button-no-background"
        onClick={() => goToMenu && setActiveMenu(goToMenu)}
      >
        {leftIcon}
      </a>
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
          <DropdownItem leftIcon={<CogIcon />} rightIcon={<ChevronIcon />}>
            PDF Resume
          </DropdownItem>
          <DropdownItem
            leftIcon={<UsersIcon />}
            rightIcon={<ChevronIcon />}
            goToMenu="social-media"
          >
            Social Media
          </DropdownItem>
          <DropdownItemDarkMode>Dark Mode</DropdownItemDarkMode>
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
          <DropdownItem leftIcon={<GitHubIcon />}>GitHub</DropdownItem>
          <DropdownItem leftIcon={<LinkedInIcon />}>LinkedIn</DropdownItem>
          <DropdownItem leftIcon={<InstagramIcon />}>Instagram</DropdownItem>
          <DropdownItem leftIcon={<TwitterIcon />}>Twitter</DropdownItem>
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
