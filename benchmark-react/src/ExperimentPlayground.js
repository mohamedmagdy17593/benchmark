import React, {unstable_Profiler as Profiler} from 'react'
import cuid from 'cuid'
import {logProfile} from './ExperimentResult'

const range = num => Array.from({length: num}, (_, i) => i)
const generator = arr => () => arr.map(cuid)

class ExperimentPlayground extends React.PureComponent {
  static defaultProps = {
    numOfRenderdComponent: 100,
    numOfReRenders: 10,
    reRenderIntervar: 1000,
    profilerName: 'unknown',
  }

  keyGenerator = generator(range(this.props.numOfRenderdComponent))
  state = {keys: this.keyGenerator()}

  componentDidMount() {
    this.update()
  }
  updateKeys = () => this.setState({keys: this.keyGenerator()})
  _count = 0
  update() {
    const {numOfReRenders, reRenderIntervar} = this.props
    setTimeout(() => {
      if (this._count < numOfReRenders) {
        this._count++
        this.updateKeys()
        this.update()
      } else {
        alert('Completed!')
      }
    }, reRenderIntervar)
  }

  render() {
    const {keys} = this.state
    const {profilerName} = this.props
    return (
      <Profiler id={profilerName} onRender={logProfile}>
        {keys.map(id => React.cloneElement(this.props.children, {key: id}))}
      </Profiler>
    )
  }
}

export default ExperimentPlayground
