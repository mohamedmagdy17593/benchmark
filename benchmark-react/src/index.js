import React from 'react'
import ExperimentPlayground from './ExperimentPlayground'
import ExperimentResult from './ExperimentResult'
import PropType from 'prop-types'

/**
 * using this main Component
 * using it like
 * <Benchmark
 *   numOfRenderdComponent={100}, // default
 *   numOfReRenders={10}, // default
 *   reRenderIntervar={1000}, // default
 *   profilerName={'unknown'}
 * >
 *   <Test />
 * </Benchmark>
 */
function Benchmark(props) {
  return (
    <>
      <ExperimentResult {...props} />
      <hr style={{border: '5px solid black', margin: '30px 0 '}} />
      <h2 style={{textAlign: 'center', margin: '12px 0'}}>
        Experiment Playground
      </h2>
      <ExperimentPlayground {...props} />
    </>
  )
}
Benchmark.prototype = {
  numOfRenderdComponent: PropType.number,
  numOfReRenders: PropType.number,
  reRenderIntervar: PropType.number,
  profilerName: PropType.string,
}

export default Benchmark
