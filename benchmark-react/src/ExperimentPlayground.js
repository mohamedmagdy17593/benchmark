import React, {unstable_Profiler as Profiler} from 'react'
import cuid from 'cuid'
import {logProfile} from './ExperimentResult'

const range = num => Array.from({length: num}, (_, i) => i)
const generator = arr => () => arr.map(cuid)

class ExperimentPlayground extends React.PureComponent {
  keyGenerator = generator(range(this.props.componentsCount))
  state = {keys: this.keyGenerator()}
  componentDidMount() {
    this.update()
  }
  updateKeys = () => this.setState({keys: this.keyGenerator()})
  _count = 0
  update() {
    const {reRendersCount, reRenderInterval} = this.props
    setTimeout(() => {
      if (this._count < reRendersCount) {
        this._count++
        this.updateKeys()
        this.update()
      } else {
        alert('Completed!')
      }
    }, reRenderInterval)
  }
  render() {
    const {keys} = this.state
    const {testCaseName} = this.props
    return (
      <Profiler id={testCaseName} onRender={logProfile}>
        {keys.map(id => React.cloneElement(this.props.children, {key: id}))}
      </Profiler>
    )
  }
}

export default ExperimentPlayground
