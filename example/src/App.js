import React from 'react'

import Benchmark from 'benchmark-react'
import Test from './Test'

function App() {
  return (
    <Benchmark
      numOfRenderdComponent={5}
      numOfReRenders={20}
      reRenderIntervar={100}
      profilerName={'Test button'}
    >
      <Test />
    </Benchmark>
  )
}

export default App
