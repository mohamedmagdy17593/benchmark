import React from 'react'
import ExperimentPlayground from './ExperimentPlayground'
import ExperimentResult from './ExperimentResult'
import PropType from 'prop-types'

/**
 * using this main Component
 * using it like
 * <Benchmark
 *   componentsCount={100}, // default
 *   reRendersCount={10}, // default
 *   reRenderInterval={1000}, // default
 *   testCaseName="some name"
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
Benchmark.defaultProps = {
  componentsCount: 100,
  reRendersCount: 10,
  reRenderInterval: 1000,
}
Benchmark.prototype = {
  componentsCount: PropType.number,
  reRendersCount: PropType.number,
  reRenderInterval: PropType.number,
  testCaseName: PropType.string.isRequired,
}

export default Benchmark
