import React, {Component} from 'react'
import FilterItem from '../FilterItem' // Importing FilterItem component
import './index.css' // Importing CSS styles

// Array of employment types
const employmentTypesList = [
  {label: 'Full Time', employmentTypeId: 'FULLTIME'},
  {label: 'Part Time', employmentTypeId: 'PARTTIME'},
  {label: 'Freelance', employmentTypeId: 'FREELANCE'},
  {label: 'Internship', employmentTypeId: 'INTERNSHIP'},
]

// Array of salary ranges
const salaryRangesList = [
  {salaryRangeId: '1000000', label: '10 LPA and above'},
  {salaryRangeId: '2000000', label: '20 LPA and above'},
  {salaryRangeId: '3000000', label: '30 LPA and above'},
  {salaryRangeId: '4000000', label: '40 LPA and above'},
]

class Filters extends Component {
  makeApiRequest = () => {
    const {
      onHandleSelectedFilters,
      selectedEmploymentTypes,
      selectedSalaryRange,
    } = this.props

    onHandleSelectedFilters(selectedEmploymentTypes, selectedSalaryRange)
  }

  toggleSalaryRangeFilter = salaryRangeId => {
    const {toggleSalaryRange} = this.props
    toggleSalaryRange(salaryRangeId)
  }

  renderFilterSalaryItems = (items, selectedSalaryRange, toggleSalaryRange) => {
    return (
      <ul className="salary-filter-container">
        {items.map(item => (
          <FilterItem
            key={item.salaryRangeId}
            item={item}
            selectedSalaryRange={selectedSalaryRange}
            toggleSalaryRange={toggleSalaryRange}
            filterType="salary"
          />
        ))}
      </ul>
    )
  }

  renderFilterEmpTypes = (
    items,
    selectedEmploymentTypes,
    toggleEmploymentType,
  ) => {
    return (
      <ul className="employment-filter-container">
        {items.map(item => (
          <FilterItem
            key={item.employmentTypeId}
            item={item}
            selectedEmploymentTypes={selectedEmploymentTypes}
            toggleEmploymentType={toggleEmploymentType}
          />
        ))}
      </ul>
    )
  }

  render() {
    const {
      selectedEmploymentTypes,
      selectedSalaryRange,
      toggleEmploymentType,
      toggleSalaryRange,
    } = this.props

    return (
      <div className="filters-container">
        <hr className="hr-line" />
        <h1 className="filter-heading">Type of Employment</h1>
        {this.renderFilterEmpTypes(
          employmentTypesList,
          selectedEmploymentTypes,
          toggleEmploymentType,
        )}
        <hr className="hr-line" />
        <h1 className="filter-heading">Salary Range</h1>
        {this.renderFilterSalaryItems(
          salaryRangesList,
          selectedSalaryRange,
          toggleSalaryRange,
        )}
      </div>
    )
  }
}

export default Filters
