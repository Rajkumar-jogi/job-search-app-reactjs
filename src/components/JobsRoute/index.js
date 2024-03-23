import {BsSearch} from 'react-icons/bs'

import {Component} from 'react'

import Cookies from 'js-cookie'

import Loader from 'react-loader-spinner'

import Header from '../Header'

import UserProfile from '../UserProfile'

import JobsListView from '../JobsListView'

import Filters from '../Filters'

// import FilterItemsContext from '../../context/FilterItemsContext'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
  notFound: 'NOT_FOUND',
}

class JobsRoute extends Component {
  state = {
    jobsList: [],
    apiStatus: apiStatusConstants.initial,
    searchInput: '',
    selectedEmploymentTypes: [],
    selectedSalaryRange: null,
  }

  componentDidMount() {
    this.getJobsList()
  }

  getFormatedJobItem = jobItem => {
    const formatedJobItem = {
      id: jobItem.id,
      companyLogoUrl: jobItem.company_logo_url,
      employmentType: jobItem.employment_type,
      jobDescription: jobItem.job_description,
      location: jobItem.location,
      packagePerAnnum: jobItem.package_per_annum,
      rating: jobItem.rating,
      title: jobItem.title,
    }
    return formatedJobItem
  }

  getUpdatedJobsList = jobs => {
    const updatedJobsList = jobs.map(jobItem =>
      this.getFormatedJobItem(jobItem),
    )
    return updatedJobsList
  }

  getJobsList = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const {searchInput, selectedEmploymentTypes, selectedSalaryRange} =
      this.state

    // console.log(selectedEmploymentTypes)

    const selectedSalaryFilter =
      selectedSalaryRange !== null ? selectedSalaryRange : ''

    const getJobsListUrl = `https://apis.ccbp.in/jobs?employment_type=${selectedEmploymentTypes}&minimum_package=${selectedSalaryFilter}&search=${searchInput}`

    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `bearer ${jwtToken}`,
      },
    }

    try {
      const response = await fetch(getJobsListUrl, options)
      const data = await response.json()

      if (response.ok) {
        const updatedJobsList = this.getUpdatedJobsList(data.jobs)
        if (updatedJobsList.length === 0) {
          this.setState({apiStatus: apiStatusConstants.notFound})
        } else {
          this.setState({
            jobsList: updatedJobsList,
            apiStatus: apiStatusConstants.success,
          })
        }
      } else {
        throw new Error('Failed to fetch jobs')
      }
    } catch (error) {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderJobsListView = () => {
    const {jobsList} = this.state
    return <JobsListView jobsList={jobsList} />
  }

  renderLoadingView = () => {
    return (
      <div className="loader-container" data-testid="loader">
        <Loader type="ThreeDots" color="#ffffff" height={50} width={50} />
      </div>
    )
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
        <button type="button">Retry</button>
      </div>
    )
  }

  renderNoJobsView = () => {
    return (
      <div className="no-jobs-view-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png "
          alt="no jobs"
          className="no-jobs-image"
        />
        <h1 className="failure-text">No Jobs Found</h1>
        <p>We could not find any jobs. Try other filters.</p>
      </div>
    )
  }

  handleDifferentViews = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case 'IN_PROGRESS':
        return this.renderLoadingView()
      case 'FAILURE':
        return this.renderFailureView()
      case 'SUCCESS':
        return this.renderJobsListView()
      case 'NOT_FOUND':
        return this.renderNoJobsView()
      default:
        return ''
    }
  }

  handleFiltersJobs = event => {
    const {value} = event.target
    this.setState({searchInput: value})
  }

  onClickSearchButton = () => {
    this.getJobsList()
  }

  onHandleSelectedFilters = (selectedEmploymentTypes, selectedSalaryRange) => {
    this.setState(
      {selectedEmploymentTypes, selectedSalaryRange},
      this.getJobsList,
    )
  }

  toggleEmploymentType = employmentTypeId => {
    // console.log(employmentTypeId)
    this.setState(prevState => {
      const {selectedEmploymentTypes} = prevState
      const index = selectedEmploymentTypes.indexOf(employmentTypeId)
      if (index === -1) {
        return {
          selectedEmploymentTypes: [
            ...selectedEmploymentTypes,
            employmentTypeId,
          ],
        }
      } else {
        return {
          selectedEmploymentTypes: selectedEmploymentTypes.filter(
            id => id !== employmentTypeId,
          ),
        }
      }
    }, this.getJobsList)
  }

  toggleSalaryRange = salaryRangeId => {
    // console.log(salaryRangeId)
    this.setState({selectedSalaryRange: salaryRangeId}, this.getJobsList)
  }

  renderJobsInnerContainer = () => {
    const {searchInput, selectedEmploymentTypes, selectedSalaryRange} =
      this.state

    return (
      <div className="responsive-container">
        <div className="jobs-inner-container">
          <div className="mobile-search-bar-container">
            <input type="search" className="search" placeholder="search" />
            <button
              className="search-button"
              type="button"
              data-testid="searchButton"
            >
              <BsSearch />
            </button>
          </div>
          <UserProfile />
          <Filters
            onHandleSelectedFilters={this.onHandleSelectedFilters}
            selectedSalaryRange={selectedSalaryRange}
            selectedEmploymentTypes={selectedEmploymentTypes}
            toggleSalaryRange={this.toggleSalaryRange}
            toggleEmploymentType={this.toggleEmploymentType}
          />
        </div>

        <div className="jobs-list-container">
          <div className="desktop-search-bar-container">
            <input
              type="search"
              className="search"
              placeholder="search"
              onChange={this.handleFiltersJobs}
              value={searchInput}
            />
            <button
              className="search-button"
              type="button"
              onClick={this.onClickSearchButton}
            >
              <BsSearch />
            </button>
          </div>
          {this.handleDifferentViews()}
        </div>
      </div>
    )
  }
  render() {
    return (
      <div className="jobs-route-cotainer">
        <Header />
        <div className="jobs-outer-container">
          {this.renderJobsInnerContainer()}
        </div>
      </div>
    )
  }
}

export default JobsRoute
