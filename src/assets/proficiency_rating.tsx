import React from "react"
import PropTypes from "prop-types"
import "./proficiency_rating.scss"

const Proficiency_Rating = ({ percentage }) => {
  return (
    <div className="proficiency-rating-container">
      <div style={{ width: percentage }} className="proficiency-rating-upper">
        <span>•</span>
        <span>•</span>
        <span>•</span>
        <span>•</span>
        <span>•</span>
      </div>
      <div className="proficiency-rating-lower">
        <span>•</span>
        <span>•</span>
        <span>•</span>
        <span>•</span>
        <span>•</span>
      </div>
    </div>
  )
}

Proficiency_Rating.propTypes = {
  percentage: PropTypes.string.isRequired,
}

export default Proficiency_Rating
