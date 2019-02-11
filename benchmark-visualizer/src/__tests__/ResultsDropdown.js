import React from 'react'

import ResultsDropdown from '../ResultsDropdown'

import {render as _render, waitForElement, act} from 'react-testing-library'
import ResultsProvider from '../ResultsProvider'

function render(ui, ...args) {
  return _render(<ResultsProvider>{ui}</ResultsProvider>, ...args)
}

jest.mock('../api', () => ({
  getFileNames() {
    return Promise.resolve(['ahmed', 'mohamed'])
  },
  getResults() {
    return Promise.resolve({})
  },
}))

test('<ResultsDropdown /> get fileNames', async () => {
  act(async () => {
    const {getAllByTestId, getByTestId} = render(<ResultsDropdown />)
    const options = await waitForElement(() => getAllByTestId('results'))
    const select = getByTestId('results-dropdown')
    expect(options.length).toBe(2)
    expect(select.value).toBe('ahmed')
  })
})
