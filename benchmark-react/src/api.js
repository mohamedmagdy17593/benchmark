const url = 'http://localhost:8080/files'

function sendResults(path, data) {
  return fetch(`${url}/${path}`, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }).then(res => res.json())
}

export {sendResults, url}
