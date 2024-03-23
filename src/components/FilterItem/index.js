import {Component} from 'react'

import './index.css'

class FilterItem extends Component {
  render() {
    const {filterType} = this.props
    if (filterType === 'salary') {
      const {selectedSalaryRange, item, toggleSalaryRange} = this.props
      const {salaryRangeId, label} = item
      const checkedStatus = selectedSalaryRange === salaryRangeId
      return (
        <li className="salary-field-container">
          <input
            type="radio"
            id={salaryRangeId}
            className="filter-input"
            checked={checkedStatus}
            onChange={() => toggleSalaryRange(salaryRangeId)}
            name="salary"
          />
          <label htmlFor={salaryRangeId} className="label-text">
            {label}
          </label>
        </li>
      )
    }

    const {selectedEmploymentTypes, item, toggleEmploymentType} = this.props

    const {employmentTypeId, label} = item

    const isChecked = selectedEmploymentTypes.includes(employmentTypeId)

    return (
      <li className="employment-field-container">
        <input
          type="checkbox"
          id={employmentTypeId}
          className="filter-input"
          checked={isChecked}
          onChange={() => toggleEmploymentType(employmentTypeId)}
        />
        <label htmlFor={employmentTypeId} className="label-text">
          {label}
        </label>
      </li>
    )
  }
}

export default FilterItem
