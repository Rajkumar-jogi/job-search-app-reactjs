import JobListItem from '../JobListItem'

import './index.css'

const JobListView = props => {
  const {jobsList} = props
  return (
    <>
      <ul className="jobs-list">
        {jobsList.map(jobItem => (
          <JobListItem jobItem={jobItem} key={jobItem.id} />
        ))}
      </ul>
    </>
  )
}
export default JobListView
