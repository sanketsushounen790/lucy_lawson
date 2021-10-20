import fetch from "node-fetch"

const getGodWords = () => {
  return fetch("https://sanketsushounen790.github.io/jsonapi/loichua.json")
    .then(res => {
      return res.json()
    })
    .then(data => {
      return data
    })
}

export default getGodWords