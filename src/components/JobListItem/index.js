import {Link} from 'react-router-dom'
import './index.css'

import {IoIosStar} from 'react-icons/io'

import {FaBriefcase} from 'react-icons/fa'

import {IoLocationSharp} from 'react-icons/io5'

const JobListItem = props => {
  const {jobItem} = props
  const {
    id,
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = jobItem

  return (
    <Link to={`/jobs/${id}`} className="nav-link">
      <li className="job-list-item">
        <div className="company-profile-container">
          <img
            src={companyLogoUrl}
            alt="company logo"
            className="company-logo"
          />
          <div className="job-name-and-rating-container">
            <h1 className="job-name">{title}</h1>
            <div className="rating-container">
              <IoIosStar className="rating-icon-color" />

              <p className="rating">{rating}</p>
            </div>
          </div>
        </div>
        <div className="job-location-salary-container">
          <div className="job-location-and-typ-container">
            <p className="locaton">
              <IoLocationSharp className="location-icon" />
              {location}
            </p>
            <p className="job-type">
              <FaBriefcase className="employment-type-icon" />
              {employmentType}
            </p>
          </div>
          <p className="salary">{packagePerAnnum}</p>
        </div>
        <hr className="hr-line" />
        <div className="job-description-container">
          <h1 className="job-description-heading">Description</h1>
          <p className="job-description">{jobDescription}</p>
        </div>
      </li>
    </Link>
  )
}

export default JobListItem
