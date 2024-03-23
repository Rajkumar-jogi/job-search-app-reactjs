import Header from '../Header'
import './index.css'

const HomeRoute = props => {
  const onClickFindJobs = () => {
    const {history} = props
    history.push('/jobs')
  }

  return (
    <div className="home-route-container">
      <Header />
      <div className="home-container">
        <div className="home-content-container">
          <h1 className="home-heading">Find The Job That Fits Your Life</h1>
          <p className="home-discription">
            Millions of people are searching for jobs, salary information,
            company reviews, Find the job that fits your abilites and
            potentials.
          </p>
          <button className="find-jobs-button" onClick={onClickFindJobs}>
            Find Jobs
          </button>
        </div>
      </div>
    </div>
  )
}
export default HomeRoute
