import fetch from "node-fetch"

const getCountriesData = (countryName) => {
  return fetch("https://sanketsushounen790.github.io/jsonapi/db.json")
    .then(res => {
      return res.json()
    })
    .then(data => {
      return data["countriesAPI"].filter(country => {
        return country["translations"]["vn"].toLocaleLowerCase() == countryName
      })
    })
}

export default getCountriesData

