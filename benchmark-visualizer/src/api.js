import {setChecked} from './utils'

const url = 'http://localhost:8080/files'

function showError() {
  const div = document.createElement('div')
  const style = {
    width: '100%',
    height: '100%',
    background: 'red',
    color: 'white',
    position: 'fixed',
    top: 0,
    left: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }
  div.innerHTML = 'please open benchmark server, then refresh'
  Object.entries(style).forEach(([prop, value]) => {
    div.style[prop] = value
  })
  document.body.appendChild(div)
}

function reFetch(...args) {
  return fetch(...args).catch(e => {
    showError()
    throw e
  })
}

function getFileNames() {
  return reFetch(url).then(res => res.json())
}

function getResults(fileName) {
  return reFetch(`${url}/${fileName}`)
    .then(res => res.json())
    .then(setChecked(() => true))
}

function deleteExperment(fileName, index) {
  console.log(index)
  return reFetch(`${url}/${fileName}`, {
    method: 'delete',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({index}),
  }).then(res => res.json())
}

export {getFileNames, getResults, deleteExperment}
