import {FiExternalLink} from 'react-icons/fi'

import {IoLocationSharp} from 'react-icons/io5'

import {IoIosStar} from 'react-icons/io'

import {FaBriefcase} from 'react-icons/fa'

import {Component} from 'react'

import Cookies from 'js-cookie'

import Header from '../Header'

import Loader from 'react-loader-spinner'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class JobDetailsRoute extends Component {
  state = {
    jobDetails: {},
    similarJobs: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getJobDetails()
  }

  getFormatedSkills = skill => {
    const formatedSkill = {
      imageUrl: skill.image_url,
      name: skill.name,
    }
    return formatedSkill
  }

  getFormatedJobDetails = jobDetails => {
    const formatedJobDetails = {
      id: jobDetails.id,
      companyLogUrl: jobDetails.company_logo_url,
      companyWebsiteUrl: jobDetails.company_website_url,
      employmentType: jobDetails.employment_type,
      jobDescription: jobDetails.job_description,
      location: jobDetails.location,
      packagePerAnnum: jobDetails.package_per_annum,
      title: jobDetails.title,
      rating: jobDetails.rating,
      lifeAtCompany: {
        description: jobDetails.life_at_company.description,
        imageUrl: jobDetails.life_at_company.image_url,
      },
      skills: jobDetails.skills.map(skill => this.getFormatedSkills(skill)),
    }

    return formatedJobDetails
  }

  getFormatedSimilarJob = similarJob => {
    const formatedSimilarJob = {
      companyLogUrl: similarJob.company_logo_url,
      employmentType: similarJob.employment_type,
      jobDescription: similarJob.job_description,
      location: similarJob.location,
      title: similarJob.title,
      rating: similarJob.rating,
      id: similarJob.id,
    }

    return formatedSimilarJob
  }

  getFormatedData = fetchedData => {
    const {job_details, similar_jobs} = fetchedData

    const jobDetails = this.getFormatedJobDetails(job_details)
    const similarJobs = similar_jobs.map(similarJob =>
      this.getFormatedSimilarJob(similarJob),
    )
    // console.log(jobDetails)
    const formatedData = {jobDetails, similarJobs}
    return formatedData
  }

  getJobDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params

    const jwtToken = Cookies.get('jwt_token')

    const jobDetailsApiUrl = `https://apis.ccbp.in/jobs/${id}`

    const options = {
      method: 'GET',
      headers: {
        Authorization: `bearer ${jwtToken}`,
      },
    }

    const response = await fetch(jobDetailsApiUrl, options)
    const fetchedData = await response.json()
    // console.log(fetchedData)
    if (response.ok) {
      const formatedData = this.getFormatedData(fetchedData)
      const {jobDetails, similarJobs} = formatedData
      this.setState({
        jobDetails,
        similarJobs,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderSkillItem = skill => {
    const {name, imageUrl} = skill
    return (
      <li className="skill-item" key={name}>
        <img src={imageUrl} alt={name} className="skill-image" />
        <p className="skill-name">{name}</p>
      </li>
    )
  }

  renderSimilarJobItem = similarJob => {
    const {
      jobDescription,
      companyLogUrl,
      employmentType,
      id,
      location,
      title,
      rating,
    } = similarJob

    return (
      <li className="similar-job-item" key={similarJob.id}>
        <div className="company-profile-container">
          <img
            src={companyLogUrl}
            alt="similar job company logo"
            className="company-logo"
          />
          <div className="job-name-and-rating-container">
            <h1 className="job-name">{title}</h1>
            <div className="rating-container">
              <p className="rating-icon">
                <IoIosStar />
              </p>
              <p className="rating">{rating}</p>
            </div>
          </div>
        </div>
        <div className="job-description-container">
          <h1 className="job-description-heading">Description</h1>
          <p className="job-description">{jobDescription}</p>
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
        </div>
      </li>
    )
  }

  onClickVisit = () => {
    // console.log(this.props)
    const {jobDetails} = this.state
    const {companyWebsiteUrl} = jobDetails
    // console.log(companyWebsiteUrl)
    const {history} = this.props
    // history.push({companyWebsiteUrl})
  }

  onClickRetry = () => {
    this.getJobDetails()
  }

  renderFailureView = () => {
    return (
      <div className="failure-view-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
          alt="failure view"
          className="failure-view-image"
        />
        <h1 className="failure-text">Oops! Something Went Wrong</h1>
        <p>We cannot seem to find the page you are looking for.</p>
        <button
          type="button"
          className="retry-button"
          onClick={this.onClickRetry}
        >
          Retry
        </button>
      </div>
    )
  }

  renderJobDetilsView = () => {
    const {jobDetails, similarJobs} = this.state
    const {
      skills,
      jobDescription,
      companyLogUrl,
      employmentType,
      id,
      location,
      title,
      rating,
      lifeAtCompany,
      companyWebsiteUrl,
      packagePerAnnum,
    } = jobDetails

    let companyDescription = ''
    let companyImage = ''

    if (lifeAtCompany !== undefined) {
      const {description, imageUrl} = lifeAtCompany
      companyDescription = description
      companyImage = imageUrl
    }

    return (
      <>
        <div className="job-item">
          <div className="company-profile-container">
            <img
              src={companyLogUrl}
              alt="job details company logo"
              className="company-logo"
            />
            <div className="job-name-and-rating-container">
              <h1 className="job-name">{title}</h1>
              <div className="rating-container">
                <p className="rating-icon">
                  <IoIosStar />
                </p>
                <p className="rating">{rating}</p>
              </div>
            </div>
          </div>
          <div className="job-location-salary-container">
            <div className="job-location-and-type-container">
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
            <div className="job-description-heading-and-link-container">
              <h1 className="job-description-heading">Description</h1>
              <a className="nav-link" href={companyWebsiteUrl} target="_blank">
                <button className="visit-button">
                  Visit <FiExternalLink />
                </button>
              </a>
            </div>

            <p className="job-description">{jobDescription}</p>
          </div>
          <div className="skills-container">
            <h1 className="skills-heading">Skills</h1>
            {skills !== undefined ? (
              <ul className="skills-list">
                {skills.map(skill => this.renderSkillItem(skill))}
              </ul>
            ) : (
              ''
            )}
          </div>
          <div className="life-at-company-container">
            <div className="life-at-company-content-container">
              <h1 className="life-at-company-heading">Life At company</h1>
              <p className="company-description">{companyDescription}</p>
            </div>

            <div className="company-life-image-container">
              <img src={companyImage} alt="life at company" />
            </div>
          </div>
        </div>
        <div className="similar-jobs-container">
          <h1 className="similar-job-heading">Similar Jobs</h1>
          <ul className="similar-jobs-list">
            {similarJobs.map(similarJob =>
              this.renderSimilarJobItem(similarJob),
            )}
          </ul>
        </div>
      </>
    )
  }

  renderLoadingView = () => {
    return (
      <div className="loader-container" data-testid="loader">
        <Loader type="ThreeDots" color="#ffffff" height={50} width={50} />
      </div>
    )
  }

  renderdifferentView = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case 'IN_PROGRESS':
        return this.renderLoadingView()
      case 'FAILURE':
        return this.renderFailureView()
      case 'SUCCESS':
        return this.renderJobDetilsView()

      default:
        return ''
    }
  }

  render() {
    // console.log(jobDetails)

    // console.log(similarJobs)

    return (
      <div className="job-details-route">
        <Header />
        <div className="job-item-container">{this.renderdifferentView()}</div>
      </div>
    )
  }
}
export default JobDetailsRoute
