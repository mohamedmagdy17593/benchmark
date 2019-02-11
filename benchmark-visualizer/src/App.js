// import React from 'react'
import React from 'react'

import ResultsDropdown from './ResultsDropdown'
import ResultsProvider from './ResultsProvider'
import ResultsToggles from './ResultsToggles'
import ResultsShow from './ResultsShow'

function App() {
  return (
    <ResultsProvider>
      <div className="container">
        <div className="row pt-4">
          <div className="col-4">
            <ResultsDropdown />
            <hr />
            <ResultsToggles />
          </div>
          <div className="col-8">
            <ResultsShow />
          </div>
        </div>
      </div>
    </ResultsProvider>
  )
}

export default App
