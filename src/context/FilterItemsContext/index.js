import React from 'react'

const FilterItemsContext = React.createContext({
  salaryRange: null,
  employmentTypes: [],
  onToggleEmpType: () => {},
  onToggleSalaryRange: () => {},
})

export default FilterItemsContext
