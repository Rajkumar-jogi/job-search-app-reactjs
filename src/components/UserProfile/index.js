import {Component} from 'react'

import Cookies from 'js-cookie'

import Loader from 'react-loader-spinner'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class UserProfile extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    userProfile: {},
  }

  componentDidMount() {
    this.getProfileDetails()
  }

  getFormatedUserProfileData = userProfile => {
    const formatedUserProfile = {
      name: userProfile.name,
      profileImgUrl: userProfile.profile_image_url,
      shortBio: userProfile.short_bio,
    }
    return formatedUserProfile
  }

  getProfileDetails = async () => {
    const profileApiUrl = 'https://apis.ccbp.in/profile'
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')

    const options = {
      method: 'GET',
      headers: {
        Authorization: `bearer ${jwtToken}`,
      },
    }

    const response = await fetch(profileApiUrl, options)
    // console.log(response)
    const fetchedData = await response.json()
    if (response.ok) {
      const updatedUserProfileData = this.getFormatedUserProfileData(
        fetchedData.profile_details,
      )
      this.setState({
        userProfile: updatedUserProfileData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  onClickRetryButton = () => {
    this.getProfileDetails()
  }

  renderEmptyProfileView = () => (
    <div className="profile-empty-container">
      <button
        type="button"
        className="retry-button"
        onClick={this.onClickRetryButton}
      >
        Retry
      </button>
    </div>
  )

  renderLoadingView = () => {
    return (
      <div className="loader-container" data-testid="loader">
        <Loader type="ThreeDots" color="#ffffff" height={50} width={50} />
      </div>
    )
  }

  renderProfileView = () => {
    const {userProfile} = this.state

    const {name, profileImgUrl, shortBio} = userProfile
    return (
      <div className="profile-details-container">
        <img src={profileImgUrl} alt="profile" className="profile-image" />
        <h1 className="profile-name">{name}</h1>
        <p className="profile-designation">{shortBio}</p>
      </div>
    )
  }

  renderProfileDetails = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case 'IN_PROGRESS':
        return this.renderLoadingView()
      case 'FAILURE':
        return this.renderEmptyProfileView()
      case 'SUCCESS':
        return this.renderProfileView()
      default:
        return ''
    }
  }

  render() {
    return this.renderProfileDetails()
  }
}
export default UserProfile
