import React from 'react'
import ReactJson from 'react-json-view'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts'

import {useResults} from './ResultsProvider'

function ResultsDropdownFilter({onChange, value}) {
  return (
    <select
      value={value}
      onChange={e => onChange(e.target.value)}
      className="custom-select"
    >
      <option value="actualTime">actualTime</option>
      <option value="baseTime">baseTime</option>
      <option value="difference">difference</option>
    </select>
  )
}

function ResultsShow() {
  const {results} = useResults()
  const [filterKey, setFilterKey] = React.useState('actualTime')

  const checkedResults = results.filter(r => r.checked)
  const avgCheckedResults = getAvgFor(checkedResults, filterKey)

  React.useEffect(() => {
    console.table(results)
  }, [results])

  return (
    <div>
      <ResultsDropdownFilter onChange={setFilterKey} value={filterKey} />
      <hr />
      <BarChart width={700} height={300} data={avgCheckedResults}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="avg" fill="#007bff" />
      </BarChart>
      <br />
      <ReactJson collapsed src={avgCheckedResults} />
      <ReactJson collapsed src={results} />
    </div>
  )
}

function getAvgFor(results, key) {
  return results.map(r => ({
    name: r.testCaseName,
    avg: (r.info.update || []).reduce(
      (avg, x, _, arr) => avg + x[key] / arr.length,
      0,
    ),
  }))
}

export default ResultsShow
