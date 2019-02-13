const url = 'http://localhost:8080'

function sendResults(path, data) {
  return fetch(`${url}/files/${path}`, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then(res => res.json())
    .catch(e => {
      alert('please open benchmark server')
      throw e
    })
}

export {sendResults, url}
