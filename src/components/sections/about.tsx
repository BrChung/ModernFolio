import React from "react"
import PropTypes from "prop-types"
import About_Background from "./about_components/background"
import About_Education from "./about_components/education"
import About_Languages from "./about_components/languages"
import About_Technologies from "./about_components/technologies"
import About_Certification from "./about_components/certification"
import "./about.scss"
import About_Interests from "./about_components/interests"

const About = ({
  about,
  education,
  languages,
  technologies,
  certifications,
  interests,
}) => {
  return (
    <section id="about" className="about-container">
      <h3 className="about-container-title">About Me</h3>
      <div className="about-content-container">
        <About_Background data={about} />
        <About_Education data={education} />
        <About_Languages data={languages} />
        <About_Technologies data={technologies} />
        <About_Certification data={certifications} />
        <About_Interests data={interests} />
      </div>
    </section>
  )
}

About.propTypes = {
  about: PropTypes.array.isRequired,
}

export default About
