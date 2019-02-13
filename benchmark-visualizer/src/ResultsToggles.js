import React from 'react'
import {useResults} from './ResultsProvider'
import {setChecked} from './utils'

function CheckActionButton({action, ...props}) {
  const {setResults} = useResults()
  return (
    <button
      className="btn btn-link"
      onClick={() => setResults(setChecked(action))}
      {...props}
    />
  )
}

function ResultsToggles() {
  const {results, setResultByIndex, deleteExpermentByIndex} = useResults()
  return (
    <section>
      <div className="d-flex justify-content-center pb-2">
        <CheckActionButton action={() => false}>unselect all</CheckActionButton>
        <CheckActionButton action={() => true}>select all</CheckActionButton>
        <CheckActionButton action={c => !c}>toggle all</CheckActionButton>
      </div>
      {results.map(({testCaseName, checked}, i) => (
        <div className="custom-control custom-checkbox" key={i}>
          <input
            type="checkbox"
            className="custom-control-input"
            id={`toggle-${i}`}
            checked={checked}
            onChange={() => setResultByIndex(i, {checked: !checked})}
          />
          <label className="custom-control-label" htmlFor={`toggle-${i}`}>
            {testCaseName}
            <button
              className="btn btn-link"
              style={{padding: '0 10px', color: 'red'}}
              onClick={() =>
                window.confirm(`are you sure to delete this ${testCaseName}`) &&
                deleteExpermentByIndex(i)
              }
            >
              X
            </button>
          </label>
        </div>
      ))}
    </section>
  )
}

export default ResultsToggles
