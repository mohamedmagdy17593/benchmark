import React from 'react'
import {getResults, getFileNames, deleteExperment} from './api'

const resultsContext = React.createContext()

function ResultsProvider({children}) {
  const [results, setResults] = React.useState([])
  const [fileNames, setFileNames] = React.useState([])
  const [fileName, _setFileName] = React.useState()

  React.useEffect(() => {
    getFileNames().then(fileNames => {
      setFileNames(fileNames)
      setFileName(fileNames[0])
    })
  }, [])

  function setResultByIndex(resultIndex, data) {
    setResults(results =>
      results.map((r, i) => (i === resultIndex ? {...r, ...data} : r)),
    )
  }

  function setFileName(fileName) {
    _setFileName(fileName)
    if (fileName) {
      getResults(fileName).then(setResults)
    }
  }

  function deleteExpermentByIndex(index) {
    deleteExperment(fileName, index)
    setResults(results.filter((_, i) => i !== +index))
  }

  return (
    <resultsContext.Provider
      value={React.useMemo(
        () => ({
          results,
          setResults,
          setResultByIndex,
          fileNames,
          setFileNames,
          fileName,
          setFileName,
          deleteExpermentByIndex,
        }),
        [results, fileNames, fileName],
      )}
    >
      {children}
    </resultsContext.Provider>
  )
}

function useResults() {
  return React.useContext(resultsContext)
}

export {useResults}
export default ResultsProvider
