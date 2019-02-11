import * as R from 'ramda'

const setChecked = R.curry((valueFn, results) =>
  results.map(result => ({
    ...result,
    checked: valueFn(result.checked),
  })),
)

export {setChecked}
