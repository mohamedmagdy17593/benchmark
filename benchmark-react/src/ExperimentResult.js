import React, {Component} from 'react'
import * as R from 'ramda'
import {sendResults, url} from './api'
import './results.css'

let f

function logProfile(
  _id,
  phase,
  actualTime,
  baseTime,
  startTime,
  commitTime,
  interactions,
) {
  f({
    info: {
      [phase]: [
        {
          actualTime,
          baseTime,
          startTime,
          commitTime,
          interactions,
          difference: commitTime - startTime,
        },
      ],
    },
  })
}
// deep merge helper
const arrMergeDeep = R.mergeDeepWith(R.concat)

const propsTotal = props => objects =>
  objects.reduce(
    (objectsAcc, o) =>
      props.reduce(
        (acc, prop) => ({
          ...acc,
          [prop]: (acc[prop] || 0) + o[prop],
        }),
        objectsAcc,
      ),
    {},
  )

const profilerTotal = propsTotal(['actualTime', 'baseTime', 'difference'])

function Result({results}) {
  return (
    <div>
      <div>
        {R.toPairs(results.info).map(([phaseName, phaseData], i) => {
          const len = phaseData.length
          const total = profilerTotal(phaseData)
          return (
            <div
              key={i}
              className={
                phaseName == 'update' ? 'update-container' : 'mount-container'
              }
            >
              <div>
                <h2 className="phase-title" valign="top">
                  {phaseName}
                </h2>
                <table className="benchmark-table">
                  <thead>
                    <tr>
                      <th />
                      <th>actualTime</th>
                      <th>baseTime</th>
                      <th>startTime</th>
                      <th>commitTime</th>
                      <th>difference</th>
                    </tr>
                  </thead>
                  <tbody>
                    {phaseData.map((d, i) => (
                      <tr key={i}>
                        <td valign="top">{i + 1}</td>
                        <td valign="top">{d.actualTime}</td>
                        <td valign="top">{d.baseTime}</td>
                        <td valign="top">{d.startTime}</td>
                        <td valign="top">{d.commitTime}</td>
                        <td valign="top">{d.difference}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {phaseName === 'update' && (
                <div>
                  <h2 className="phase-title" valign="top">
                    Calculations
                  </h2>
                  <table className="benchmark-table">
                    <thead>
                      <tr>
                        <th />
                        <th>actualTime</th>
                        <th>baseTime</th>
                        <th>difference</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th valign="top">total</th>
                        <td valign="top">{total.actualTime}</td>
                        <td valign="top">{total.baseTime}</td>
                        <td valign="top">{total.difference}</td>
                      </tr>
                      <tr>
                        <th valign="top">avg</th>
                        <td valign="top">{total.actualTime / len}</td>
                        <td valign="top">{total.baseTime / len}</td>
                        <td valign="top">{total.difference / len}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

class ExperimentResult extends Component {
  state = {
    results: {},
    fileName: localStorage.getItem('benchmarkFileName') || '',
    testCaseName: this.props.testCaseName || '',
  }
  componentDidMount() {
    if (f) {
      console.error('Benchmark defined on a page only one time')
      alert('Benchmark defined on a page only one time')
      return
    }
    f = newResult =>
      this.setState(({results}) => ({
        results: arrMergeDeep(results, newResult),
      }))
  }
  handleFileNameChange = e => this.setState({fileName: e.target.value})
  handleTestCaseNameChange = e => this.setState({testCaseName: e.target.value})
  save = async () => {
    const [fileName, data] = this.getDataToSend()
    if (!fileName || !data.testCaseName) {
      return alert('please provide results fileName and test case name')
    }
    localStorage.setItem('benchmarkFileName', fileName)
    await sendResults(fileName, data)
    alert('saved!!')
  }
  getDataToSend() {
    const {fileName, testCaseName, results} = this.state
    const resultsInfo = R.pickAll(
      ['componentsCount', 'reRendersCount', 'reRenderInterval'],
      this.props,
    )
    return [fileName, {...resultsInfo, testCaseName, ...results}]
  }
  render() {
    const {fileName, testCaseName, results} = this.state
    return (
      <div style={{padding: 12}}>
        <header className="benchmark__test-header">
          <input
            className="benchmark__text-field"
            value={fileName}
            onChange={this.handleFileNameChange}
            placeholder="File name"
          />
          <input
            className="benchmark__text-field"
            value={testCaseName}
            onChange={this.handleTestCaseNameChange}
            placeholder="test case name"
          />
          <button className="btn btn-primary" onClick={this.save}>
            save results
          </button>{' '}
          see all{' '}
          <a href={url} target="blank">
            results
          </a>
        </header>
        <Result results={results} />
      </div>
    )
  }
}

export {logProfile}
export default ExperimentResult
