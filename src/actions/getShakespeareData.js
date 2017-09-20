const SHAKESPEARE_AUTH_TOKEN = 'koOheljmQX';
export const BASE_URL = "http://shakespeare.podium.co/api/reviews"

export function getShakespeareData() {
  return fetch(BASE_URL, {
    headers: {
      Authorization : SHAKESPEARE_AUTH_TOKEN
    }
  }).then(response => {
    response.json()
    .then(body => {
      // console.log('action', body.data)
      return body.data
    })
  }).catch(err => {
    console.log(err)
  })
}


